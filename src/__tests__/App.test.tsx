import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
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
});
