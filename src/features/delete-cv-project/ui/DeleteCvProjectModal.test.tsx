import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, Mock } from 'vitest';
import { DeleteCvProjectModal } from './DeleteCvProjectModal';
import { useMutation } from '@apollo/client/react';
import { useParams } from 'next/navigation';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh }),
  useParams: vi.fn(),
}));

vi.mock('@apollo/client/react', () => ({
  useMutation: vi.fn(),
}));

vi.mock('../api/mutations', () => ({
  REMOVE_CV_PROJECT: 'mock-remove-cv-project-query',
}));

describe('DeleteCvProjectModal', () => {
  const mockRemoveCvProject = vi.fn();

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
    (useMutation as Mock).mockReturnValue([mockRemoveCvProject]);
    (useParams as Mock).mockReturnValue({ cvId: 'cv-123', item: 'proj-1' });
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the trigger button initially', () => {
    render(<DeleteCvProjectModal projectId="proj-1" />);

    expect(screen.getByRole('button', { name: 'deleteButton' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens the modal when the trigger button is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteCvProjectModal projectId="proj-1" />);

    await user.click(screen.getByRole('button', { name: 'deleteButton' }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('header')).toBeInTheDocument();
    expect(screen.getByText('question?')).toBeInTheDocument();
  });

  it('closes the modal when the cancel button is clicked', async () => {
    const user = userEvent.setup();
    render(<DeleteCvProjectModal projectId="proj-1" />);

    await user.click(screen.getByRole('button', { name: 'deleteButton' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'cancelButton' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
    expect(mockRemoveCvProject).not.toHaveBeenCalled();
  });

  it('submits the deletion and refreshes the router on confirm click', async () => {
    const user = userEvent.setup();
    render(<DeleteCvProjectModal projectId="proj-1" />);

    await user.click(screen.getByRole('button', { name: 'deleteButton' }));
    await user.click(screen.getByRole('button', { name: 'confirmButton' }));

    await waitFor(() => {
      expect(mockRemoveCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'proj-1',
          },
        },
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('submits the deletion when the Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<DeleteCvProjectModal projectId="proj-1" />);

    await user.click(screen.getByRole('button', { name: 'deleteButton' }));

    const confirmBtn = screen.getByRole('button', { name: 'confirmButton' });
    confirmBtn.focus();
    await user.keyboard('{Enter}');

    await waitFor(() => {
      expect(mockRemoveCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'proj-1',
          },
        },
      });
      expect(mockRefresh).toHaveBeenCalled();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('does not submit if cvId is missing from params', async () => {
    (useParams as Mock).mockReturnValue({});

    const user = userEvent.setup();
    render(<DeleteCvProjectModal projectId="proj-1" />);

    await user.click(screen.getByRole('button', { name: 'deleteButton' }));
    await user.click(screen.getByRole('button', { name: 'confirmButton' }));

    expect(mockRemoveCvProject).not.toHaveBeenCalled();
  });
});
