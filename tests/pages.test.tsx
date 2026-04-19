import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';
import CitiesDirectoryPage from '@/app/cities/page';

describe('public pages', () => {
  it('renders the landing page hero', () => {
    render(<HomePage />);
    expect(screen.getByText(/Har bir shaharda qolish uchun eng qulay hududni toping/i)).toBeInTheDocument();
  });

  it('renders the cities directory', () => {
    render(<CitiesDirectoryPage />);
    expect(screen.getByText(/Tayyorlangan yo'nalishlarni ko'ring/i)).toBeInTheDocument();
  });
});
