import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, Mock } from 'vitest';
import { CreateCvProjectModal } from './CreateCvProjectModal';
import { useAddCvProject } from '../api/mutations';
import type { Project, Skill } from 'cv-graphql';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh, replace: vi.fn() }),
}));

vi.mock('../api/mutations', () => ({
  useAddCvProject: vi.fn(),
}));

describe('CreateCvProjectModal', () => {
  const mockAddCvProjectTrigger = vi.fn();

  const mockProjectList: Partial<Project>[] = [
    {
      id: 'proj-1',
      name: 'E-commerce App',
      domain: 'Retail',
      start_date: '2023-01-01T00:00:00.000Z',
      end_date: '2023-12-31T00:00:00.000Z',
      description: 'A full-stack e-commerce application.',
      environment: ['React', 'Node.js'],
    },
    {
      id: 'proj-2',
      name: 'Internal Dashboard',
      domain: 'Analytics',
      start_date: '2024-01-01T00:00:00.000Z',
      end_date: null,
      description: 'Admin dashboard for internal metrics.',
      environment: ['Vue', 'Python'],
    },
  ];

  const mockSkills: Partial<Skill>[] = [
    { id: 'skill-1', name: 'React' },
    { id: 'skill-2', name: 'Node.js' },
    { id: 'skill-3', name: 'Vue' },
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
    (useAddCvProject as Mock).mockReturnValue([mockAddCvProjectTrigger]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the trigger button initially', () => {
    render(
      <CreateCvProjectModal
        projectList={mockProjectList as Project[]}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
      />
    );

    expect(screen.getByRole('button', { name: 'CREATEBUTTON' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the modal when the trigger button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CreateCvProjectModal
        projectList={mockProjectList as Project[]}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
      />
    );

    await user.click(screen.getByRole('button', { name: 'CREATEBUTTON' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
  });

  it('populates fields correctly when a project is selected', async () => {
    const user = userEvent.setup();
    render(
      <CreateCvProjectModal
        projectList={mockProjectList as Project[]}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
      />
    );

    await user.click(screen.getByRole('button', { name: 'CREATEBUTTON' }));

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);

    const projectOption = await screen.findByRole('option', { name: 'E-commerce App' });
    await user.click(projectOption);

    expect(await screen.findByDisplayValue('Retail')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A full-stack e-commerce application.')).toBeInTheDocument();
  });

  it('submits the form successfully with split responsibilities and missing end_date', async () => {
    const user = userEvent.setup();
    render(
      <CreateCvProjectModal
        projectList={mockProjectList as Project[]}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
      />
    );

    await user.click(screen.getByRole('button', { name: 'CREATEBUTTON' }));

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);
    const projectOption = await screen.findByRole('option', { name: 'Internal Dashboard' });
    await user.click(projectOption);

    const respInput = screen.getByPlaceholderText(
      'Develop UI components, Optimize performance, Write unit tests'
    );
    await user.type(respInput, 'Setup CI/CD, Refactored Auth, ');

    const submitBtn = screen.getByRole('button', { name: 'modal.confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockAddCvProjectTrigger).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'proj-2',
            start_date: '2024-01-01T00:00:00.000Z',
            roles: [],
            responsibilities: ['Setup CI/CD', 'Refactored Auth'],
          },
        },
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('disables the submit button until required fields are filled', async () => {
    const user = userEvent.setup();
    render(
      <CreateCvProjectModal
        projectList={mockProjectList as Project[]}
        skills={mockSkills as Skill[]}
        cvId="cv-123"
      />
    );

    await user.click(screen.getByRole('button', { name: 'CREATEBUTTON' }));

    const submitBtn = screen.getByRole('button', { name: 'modal.confirmButton' });
    expect(submitBtn).toBeDisabled();
  });
});
