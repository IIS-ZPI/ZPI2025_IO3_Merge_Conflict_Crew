import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatisticalMeasures from './StatisticalMeasures';

describe('StatisticalMeasures Component', function () {
  const mockRates = [
    { mid: 10.0 },
    { mid: 20.0 },
    { mid: 30.0 },
  ];

  it('renders section title and dashboards with hyphens when empty', function () {
    render(<StatisticalMeasures />);
    
    expect(screen.getByText('Statistical Measures')).toBeInTheDocument();
    
    expect(screen.getAllByText('-')).toHaveLength(4);
  });

  it('renders correctly computed and formatted statistical measures', function () {
    render(<StatisticalMeasures rates={mockRates} />);

    expect(screen.getByText('Median')).toBeInTheDocument();
    expect(screen.getByText('Mode')).toBeInTheDocument();
    expect(screen.getByText('Std Deviation')).toBeInTheDocument();
    expect(screen.getByText('Coeff. Var.')).toBeInTheDocument();

    expect(screen.getByText('20.0000')).toBeInTheDocument();
    expect(screen.getByText('None')).toBeInTheDocument();
    expect(screen.getByText('10.0000')).toBeInTheDocument();
    expect(screen.getByText('50.00%')).toBeInTheDocument();
  });
});
