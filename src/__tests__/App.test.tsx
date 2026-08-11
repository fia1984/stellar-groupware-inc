import { vi } from "vitest";

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
Object.defineProperty(Element.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
});

import { describe, expect, it } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main website page', () => {
    render(<App />);

    const pageText = document.body.textContent || '';

    expect(pageText.length).toBeGreaterThan(50);
  });

  it('has a contact, services, or training section', () => {
    render(<App />);

    const pageText = document.body.textContent?.toLowerCase() || '';

    expect(
      pageText.includes('contact') ||
      pageText.includes('services') ||
      pageText.includes('training')
    ).toBe(true);
  });

  it('renders the completed Canada-focused homepage sections', () => {
    render(<App />);

    const pageText = document.body.textContent || '';

    expect(pageText).toContain('Our Approach');
    expect(pageText).toContain('Who We Help');
    expect(pageText).toContain('Why Stellar in Canada');
    expect(pageText).toContain('Book Your Free Consultation');
    expect(pageText).not.toContain('Why NCPL in the UK');
  });

  it('renders the complete five-phase process journey and working calls to action', () => {
    window.history.pushState({}, '', '/process');
    render(<App />);

    expect(screen.getByRole('heading', { name: /From learning to career confidence/i })).toBeTruthy();
    expect(screen.getByText('Understand Your Goal')).toBeTruthy();
    expect(screen.getByText('Build Core Skills')).toBeTruthy();
    expect(screen.getByText('Practice With Support')).toBeTruthy();
    expect(screen.getByText('Complete Practical Projects')).toBeTruthy();
    expect(screen.getByText('Prepare for Work')).toBeTruthy();
    expect(document.getElementById('process-journey')).toBeTruthy();
    expect(document.querySelector('a[href="/process#process-journey"]')).toBeTruthy();
    expect(document.querySelector('a[href="/training#job-support"]')).toBeTruthy();
    expect(document.querySelector('a[href="/training#career-mentoring"]')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Book Consultation →' }).getAttribute('href')).toBe('/appointment');
    expect(screen.getByRole('link', { name: 'Explore Training' }).getAttribute('href')).toBe('/training');
  });

  it('keeps route titles, breadcrumbs, and active navigation consistent', () => {
    window.history.pushState({}, '', '/about');
    const aboutPage = render(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About ▾' });
    expect(aboutLink.classList.contains('active')).toBe(true);
    expect(aboutLink.getAttribute('aria-current')).toBe('page');
    expect(document.title).toBe('About | Stellar Groupware Inc.');
    screen.getAllByRole('link', { name: 'My Account' }).forEach((link) => {
      expect(link.getAttribute('href')).toBe('/account');
    });

    aboutPage.unmount();
    window.history.pushState({}, '', '/contact');
    render(<App />);

    expect(document.querySelector('.breadcrumb-strip')?.textContent).toContain('Contact');
    expect(document.title).toBe('Contact | Stellar Groupware Inc.');
  });

  it('opens and closes the accessible mobile navigation', () => {
    render(<App />);

    const openButton = screen.getByRole('button', { name: 'Open navigation menu' });
    const navigation = document.getElementById('primary-navigation');

    expect(openButton.getAttribute('aria-expanded')).toBe('false');
    expect(navigation?.classList.contains('menu-open')).toBe(false);

    fireEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: 'Close navigation menu' });
    expect(closeButton.getAttribute('aria-expanded')).toBe('true');
    expect(navigation?.classList.contains('menu-open')).toBe(true);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeTruthy();
  });

  it('filters training programs when a category card is selected', () => {
    window.history.pushState({}, '', '/training');
    render(<App />);

    expect(document.querySelectorAll('.training-course-card')).toHaveLength(6);

    const aiCategory = screen.getByRole('button', {
      name: 'Show AI & Automation courses',
    });
    fireEvent.click(aiCategory);

    expect(aiCategory.getAttribute('aria-pressed')).toBe('true');
    expect(document.querySelectorAll('.training-course-card')).toHaveLength(1);
    expect(screen.getByText('1 program')).toBeTruthy();
  });

  it('uses inline validation and completes the appointment flow', () => {
    vi.useFakeTimers();
    window.history.pushState({}, '', '/appointment');
    render(<App />);

    const dateButtons = screen.getAllByRole('button', {
      name: /^(MON|TUE|WED|THU|FRI|SAT|SUN),/,
    });
    const availableDate = dateButtons.find(
      (button) => !button.hasAttribute('disabled')
    );
    const sunday = dateButtons.find((button) =>
      button.getAttribute('aria-label')?.startsWith('SUN,')
    );

    expect(dateButtons).toHaveLength(7);
    expect(availableDate).toBeTruthy();
    expect(sunday?.hasAttribute('disabled')).toBe(true);

    fireEvent.click(availableDate!);
    fireEvent.click(screen.getByRole('button', { name: '9:00 AM' }));

    const detailsForm = document.querySelector(
      '.appointment-details-form'
    ) as HTMLElement;
    const appointmentForm = within(detailsForm);
    const consentButton = screen.getByRole('button', {
      name: /By checking this box/,
    });
    const bookButton = screen.getByRole('button', {
      name: /Book Appointment/,
    });

    expect(bookButton.hasAttribute('disabled')).toBe(true);

    fireEvent.click(consentButton);
    fireEvent.click(bookButton);

    expect(
      screen.getByText('Please enter a valid email address.')
    ).toBeTruthy();
    expect(
      appointmentForm.getByLabelText(/Email/).getAttribute('aria-invalid')
    ).toBe('true');

    fireEvent.change(appointmentForm.getByLabelText(/Full Name/), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(appointmentForm.getByLabelText(/Mobile Number/), {
      target: { value: '+1 416 555 0123' },
    });
    const emailInput = appointmentForm.getByLabelText(/Email/);

    fireEvent.change(emailInput, {
      target: { value: 'jane@example.com' },
    });
    fireEvent.blur(emailInput);

    expect(
      screen.queryByText('Enter a valid email address.')
    ).toBeNull();

    fireEvent.change(appointmentForm.getByLabelText(/City/), {
      target: { value: 'Toronto' },
    });
    fireEvent.change(appointmentForm.getByLabelText(/Service Interested/), {
      target: { value: 'Regular IT Training' },
    });
    fireEvent.change(appointmentForm.getByLabelText(/Requirement/), {
      target: { value: 'I need help choosing an IT training pathway.' },
    });

    fireEvent.click(bookButton);
    expect(screen.getByText('Request prepared!')).toBeTruthy();
    expect(screen.getAllByText(/9:00 AM/).length).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(screen.queryByText('Request prepared!')).toBeNull();
    expect(screen.getByText('Select a day')).toBeTruthy();
    vi.useRealTimers();
  });


  it('connects every pricing enrollment button to a selected program', () => {
    window.history.pushState({}, '', '/pricing');
    render(<App />);

    const enrollmentLinks = screen.getAllByRole('link', {
      name: /Enroll Now/,
    });

    expect(enrollmentLinks).toHaveLength(7);
    expect(enrollmentLinks[0].getAttribute('href')).toBe(
      '/enroll?program=Regular%20IT%20Training'
    );
    expect(enrollmentLinks[6].getAttribute('href')).toBe(
      '/enroll?program=Direct%20Marketing%20Program'
    );
    enrollmentLinks.forEach((link) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    });
  });

  it('validates and completes the three-step enrollment frontend flow', () => {
    window.history.pushState(
      {},
      '',
      '/enroll?program=AI%20%2B%20IT%20Training'
    );
    render(<App />);

    expect(screen.getByText('Enter your email')).toBeTruthy();

    const enrollmentPage = document.querySelector(
      '.enrollment-page'
    ) as HTMLElement;

    expect(
      within(enrollmentPage).getByText('AI + IT Training')
    ).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));
    expect(screen.getByText('Enter a valid email address.')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'learner@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continue/ }));

    expect(screen.getByText('Tell us about yourself')).toBeTruthy();

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText('Mobile number'), {
      target: { value: '+1 416 555 0123' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'Toronto' },
    });
    fireEvent.change(
      screen.getByLabelText('Your learning or career goal'),
      {
        target: {
          value: 'I want to build practical IT skills for a new career.',
        },
      }
    );

    fireEvent.click(screen.getByRole('button', { name: /Review/ }));
    expect(screen.getByText('Confirm your details')).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: 'Confirm request' })
    );

    expect(screen.getByText('Request prepared')).toBeTruthy();
  });

});
