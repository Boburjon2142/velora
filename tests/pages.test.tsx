import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';
import CitiesDirectoryPage from '@/app/cities/page';

describe('public pages', () => {
  it('renders the landing page hero', () => {
    render(<HomePage />);
    expect(screen.getByText(/Find the most comfortable area to stay/i)).toBeInTheDocument();
  });

  it('renders the cities directory', () => {
    render(<CitiesDirectoryPage />);
    expect(screen.getByText(/Explore the seeded destinations/i)).toBeInTheDocument();
  });
});
