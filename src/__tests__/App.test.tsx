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
import { fireEvent, render, screen } from '@testing-library/react';
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
});
