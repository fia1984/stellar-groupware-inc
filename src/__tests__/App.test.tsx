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

});
