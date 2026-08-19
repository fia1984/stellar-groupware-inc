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
const scrollToMock = vi.fn();
vi.stubGlobal("scrollTo", scrollToMock);
Object.defineProperty(Element.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
});

import { describe, expect, it } from 'vitest';
import { act, createEvent, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('keeps the floating contact bubble directly clickable', () => {
    window.history.pushState({}, '', '/');
    render(<App />);

    const contactBubble = screen.getByRole('link', {
      name: 'Contact Stellar Groupware',
    });

    expect(contactBubble).toHaveAttribute(
      'href',
      'mailto:info@stellargroupware.com?subject=Stellar%20Groupware%20Inquiry'
    );
    expect(contactBubble).not.toHaveAttribute('target');
  });

  it('gives the live header logo an accessible name', () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    expect(screen.getByRole('link', { name: 'Stellar Groupware Inc.' })).toHaveAttribute('tabindex', '0')
  })

  it('allows visitors to pause and resume the hero slideshow', () => {
    window.history.pushState({}, '', '/')
    render(<App />)

    const pauseButton = screen.getByRole('button', { name: 'Pause hero slideshow' })
    expect(pauseButton).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(pauseButton)
    expect(screen.getByRole('button', { name: 'Play hero slideshow' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('opens regular routes at the top while preserving section links', () => {
    scrollToMock.mockClear();
    window.history.pushState({}, '', '/pricing');
    const pricingPage = render(<App />);

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    pricingPage.unmount();
    scrollToMock.mockClear();
    window.history.pushState({}, '', '/about#team');
    render(<App />);

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it('shows a not-found page for unknown routes and invalid courses', () => {
    window.history.pushState({}, '', '/missing-page')
    const { unmount } = render(<App />)

    expect(screen.getByRole('heading', { name: 'Page not found.' })).toBeInTheDocument()
    expect(document.title).toBe('Page Not Found | Stellar Groupware Inc.')

    unmount()
    window.history.pushState({}, '', '/course?program=NotARealCourse')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Page not found.' })).toBeInTheDocument()
  })

  it('resolves region URLs to the current homepage', () => {
    window.history.pushState({}, '', '/ca')
    const { unmount } = render(<App />)

    expect(screen.getByRole('heading', { name: /switching from non-it to it/i })).toBeInTheDocument()
    expect(document.title).toBe('Home | Stellar Groupware Inc.')

    unmount()
    window.history.pushState({}, '', '/uk')
    render(<App />)

    expect(screen.getByRole('heading', { name: /switching from non-it to it/i })).toBeInTheDocument()
  })

  it('shows the selected region in the homepage content and footer', () => {
    window.history.pushState({}, '', '/uk')
    render(<App />)

    expect(screen.getByRole('heading', { name: /why stellar in uk & eu/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /transition into the uk & eu it market/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open UK and EU website' })).toHaveAttribute('aria-current', 'page')
  })

  it('links to and renders the privacy policy and terms pages', () => {
    window.history.pushState({}, '', '/privacy')
    const privacyPage = render(<App />)

    expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1. Introduction' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '2. Information We Collect' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '4. Your Privacy Rights' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '6. Contact Us' })).toBeInTheDocument()
    expect(document.title).toBe('Privacy Policy | Stellar Groupware Inc.')
    expect(screen.getAllByRole('link', { name: 'Privacy Policy' })[0]).toHaveAttribute('href', '/privacy')
    expect(screen.getAllByRole('link', { name: 'Terms of Use' })[0]).toHaveAttribute('href', '/terms')
    expect(screen.getByRole('link', { name: 'Customer Support' })).toHaveAttribute('href', '/contact')

    privacyPage.unmount()
    window.history.pushState({}, '', '/terms')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Terms of Use' })).toBeInTheDocument()
    expect(document.title).toBe('Terms of Use | Stellar Groupware Inc.')
  })

  it('renders the refund, sitemap, and email-preference routes', () => {
    window.history.pushState({}, '', '/refund-policy')
    const refundPage = render(<App />)

    expect(screen.getByRole('heading', { name: 'Refund Policy' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Before a Program Begins' })).toBeInTheDocument()
    expect(document.title).toBe('Refund Policy | Stellar Groupware Inc.')

    refundPage.unmount()
    window.history.pushState({}, '', '/sitemap')
    const sitemapPage = render(<App />)

    expect(screen.getByRole('heading', { name: 'Site Map' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Policies & Help' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Refund Policy' })[0]).toHaveAttribute('href', '/refund-policy')

    sitemapPage.unmount()
    window.history.pushState({}, '', '/unsubscribe')
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Manage Email Preferences' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Manage Email Preferences' }).closest('.policy-hero')).toBeInTheDocument()
    expect(screen.getAllByText('Important Service Notices')).toHaveLength(1)
    fireEvent.click(screen.getByRole('button', { name: 'Update Preferences' }))
    expect(screen.getByRole('status')).toHaveTextContent('saved on this device')
    expect(document.title).toBe('Email Preferences | Stellar Groupware Inc.')
  })
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

  it('keeps dropdown parent links clickable when desktop navigation is visible', () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        media: '(max-width: 1050px)',
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });

    const { unmount } = render(<App />);

    for (const name of ['Training ▾', 'Process ▾', 'About ▾']) {
      const link = screen.getByRole('link', { name });
      const click = createEvent.click(link);

      fireEvent(link, click);

      expect(click.defaultPrevented).toBe(false);
    }

    unmount();
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: originalMatchMedia,
    });
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

  it('uses inline validation and completes the appointment flow', async () => {
    vi.useFakeTimers();
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
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

    await act(async () => {
      fireEvent.click(bookButton);
    });

    expect(screen.getByText('Booking request sent!')).toBeTruthy();
    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/appointments',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(screen.getAllByText(/9:00 AM/).length).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(screen.queryByText('Booking request sent!')).toBeNull();
    expect(screen.getByText('Select a day')).toBeTruthy();
    fetchSpy.mockRestore();
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

  it('validates and completes the three-step enrollment frontend flow', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true, id: 'enroll-1' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
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

    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: 'Confirm request' })
      );
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      '/api/enrollments',
      expect.objectContaining({ method: 'POST' }),
    );
    expect(screen.getByText('Request sent')).toBeTruthy();
    fetchSpy.mockRestore();
  });

});
