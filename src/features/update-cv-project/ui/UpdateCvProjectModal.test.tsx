import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, Mock } from 'vitest';
import { UpdateCvProjectModal } from './UpdateCvProjectModal';
import { useUpdateCvProject } from '../api/mutations';
import type { CvProject, Skill } from 'cv-graphql';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh, replace: vi.fn() }),
}));

vi.mock('../api/mutations', () => ({
  useUpdateCvProject: vi.fn(),
}));

describe('UpdateCvProjectModal', () => {
  const mockUpdateCvProjectTrigger = vi.fn();
  const mockOnOpenChange = vi.fn();

  const mockProject: Partial<CvProject> = {
    project: { id: 'proj-1' } as unknown as CvProject['project'],
    name: 'E-commerce App',
    domain: 'Retail',
    start_date: '2023-01-01T00:00:00.000Z',
    end_date: '2023-12-31T00:00:00.000Z',
    description: 'A full-stack e-commerce application.',
    environment: ['React', 'Node.js'],
    responsibilities: ['Initial Setup', 'Backend API'],
  };

  const mockSkills: Partial<Skill>[] = [
    { id: 'skill-1', name: 'React' },
    { id: 'skill-2', name: 'Node.js' },
  ];

  beforeAll(() => {
    if (typeof window !== 'undefined') {
      window.HTMLElement.prototype.hasPointerCapture = vi.fn();
      window.HTMLElement.prototype.setPointerCapture = vi.fn();
      window.HTMLElement.prototype.releasePointerCapture = vi.fn();
      window.HTMLElement.prototype.scrollIntoView = vi.fn();
    }
  });

  beforeEach(() => {
    vi.clearAllMocks();
    (useUpdateCvProject as Mock).mockReturnValue([mockUpdateCvProjectTrigger]);
  });

  afterEach(() => {
    cleanup();
  });

  it('does not render the modal content when open is false', () => {
    render(
      <UpdateCvProjectModal
        open={false}
        project={mockProject as CvProject}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders and populates fields correctly when open is true', async () => {
    render(
      <UpdateCvProjectModal
        open={true}
        project={mockProject as CvProject}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
        onOpenChange={mockOnOpenChange}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();

    expect(screen.getByDisplayValue('E-commerce App')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Retail')).toBeInTheDocument();
    expect(screen.getByDisplayValue('01/01/2023')).toBeInTheDocument();
    expect(screen.getByDisplayValue('31/12/2023')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A full-stack e-commerce application.')).toBeInTheDocument();

    const respInput = await screen.findByDisplayValue('Initial Setup, Backend API');
    expect(respInput).toBeInTheDocument();
  });

  it('calls onOpenChange when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <UpdateCvProjectModal
        open={true}
        project={mockProject as CvProject}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
        onOpenChange={mockOnOpenChange}
      />
    );

    const cancelBtn = screen.getByRole('button', { name: 'modal.cancelButton' });
    await user.click(cancelBtn);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('submits the form successfully and processes responsibilities', async () => {
    const user = userEvent.setup();
    render(
      <UpdateCvProjectModal
        open={true}
        project={mockProject as CvProject}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
        onOpenChange={mockOnOpenChange}
      />
    );

    const respInput = await screen.findByDisplayValue('Initial Setup, Backend API');
    await user.clear(respInput);
    await user.type(respInput, 'Refactored Auth, Wrote Tests, ');

    const submitBtn = screen.getByRole('button', { name: 'modal.confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateCvProjectTrigger).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'proj-1',
            start_date: '2023-01-01T00:00:00.000Z',
            end_date: '2023-12-31T00:00:00.000Z',
            roles: [],
            responsibilities: ['Refactored Auth', 'Wrote Tests'],
          },
        },
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it('disables the submit button if responsibilities are cleared', async () => {
    const user = userEvent.setup();
    render(
      <UpdateCvProjectModal
        open={true}
        project={mockProject as CvProject}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
        onOpenChange={mockOnOpenChange}
      />
    );

    const respInput = await screen.findByDisplayValue('Initial Setup, Backend API');
    await user.clear(respInput);

    const submitBtn = screen.getByRole('button', { name: 'modal.confirmButton' });

    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
  });
});
