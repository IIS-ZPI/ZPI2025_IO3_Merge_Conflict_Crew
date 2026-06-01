import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SessionSummary from './SessionSummary';

describe('SessionSummary Component', function () {
  const mockRates = [
    { mid: 4.0 },
    { mid: 4.2 },
    { mid: 4.2 },
    { mid: 4.1 },
  ];

  it('renders section title and stat cards with default values', function () {
    render(<SessionSummary />);
    
    expect(screen.getByText('Session Summary')).toBeInTheDocument();
    
    expect(screen.getAllByText('0')).toHaveLength(3);
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();
    expect(screen.getByText('No Change')).toBeInTheDocument();
  });

  it('renders computed growth, decline, and stable sessions correctly', function () {
    render(<SessionSummary rates={mockRates} />);

    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();
    expect(screen.getByText('No Change')).toBeInTheDocument();

    expect(screen.getAllByText('1')).toHaveLength(3);
  });
});
