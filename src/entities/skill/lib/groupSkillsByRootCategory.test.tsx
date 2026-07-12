import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { CvProjectTable } from '../../project';
import { ColumnDef } from '@tanstack/react-table';
import type { CvProject } from 'cv-graphql';
import { useMediaQuery } from 'react-responsive';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(),
}));

const mockColumns: ColumnDef<CvProject>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'domain', header: 'Domain' },
  { accessorKey: 'start_date', header: 'Start Date' },
  { accessorKey: 'end_date', header: 'End Date' },
];

const mockData: Partial<CvProject>[] = [
  {
    id: 'proj-1',
    name: 'Alpha Project',
    domain: 'Finance',
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    description: 'A comprehensive finance application.',
    responsibilities: ['Architecture', 'Backend integration'],
  },
  {
    id: 'proj-2',
    name: 'Beta Dashboard',
    domain: 'Analytics',
    start_date: '2024-01-01',
    end_date: '2024-06-01',
    description: 'Internal analytics dashboard.',
    responsibilities: ['UI implementation'],
  },
];

describe('CvProjectTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useMediaQuery as Mock).mockReturnValue(false);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the table with correct headers and data', () => {
    render(<CvProjectTable columns={mockColumns} data={mockData as CvProject[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Domain')).toBeInTheDocument();
    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('End Date')).toBeInTheDocument();

    expect(screen.getByText('Alpha Project')).toBeInTheDocument();
    expect(screen.getByText('Beta Dashboard')).toBeInTheDocument();

    expect(screen.getByText('A comprehensive finance application.')).toBeInTheDocument();
    expect(screen.getByText('Internal analytics dashboard.')).toBeInTheDocument();

    expect(screen.getByText('Architecture')).toBeInTheDocument();
    expect(screen.getByText('UI implementation')).toBeInTheDocument();
  });

  it('renders empty state when there is no data', () => {
    render(<CvProjectTable columns={mockColumns} data={[]} />);

    expect(screen.getByText('No results.')).toBeInTheDocument();
    expect(screen.queryByText('Alpha Project')).not.toBeInTheDocument();
  });

  it('filters data based on the search input', async () => {
    const user = userEvent.setup();
    render(<CvProjectTable columns={mockColumns} data={mockData as CvProject[]} />);

    expect(screen.getByText('Alpha Project')).toBeInTheDocument();
    expect(screen.getByText('Beta Dashboard')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('searchPlaceholder');
    await user.type(searchInput, 'Beta');

    expect(screen.queryByText('Alpha Project')).not.toBeInTheDocument();
    expect(screen.getByText('Beta Dashboard')).toBeInTheDocument();
  });

  it('hides start_date and end_date columns when screen width is less than 1024px', () => {
    (useMediaQuery as Mock).mockReturnValue(true);

    render(<CvProjectTable columns={mockColumns} data={mockData as CvProject[]} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Domain')).toBeInTheDocument();

    expect(screen.queryByText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
  });
});
