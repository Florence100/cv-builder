import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, Mock } from 'vitest';
import { AddSkillForm } from './AddSkillForm';
import { useAddProfileSkill, useAddCvSkill } from '../api/mutations';
import { Skill, Mastery } from 'cv-graphql';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh, replace: vi.fn() }),
}));

vi.mock('../api/mutations', () => ({
  useAddProfileSkill: vi.fn(),
  useAddCvSkill: vi.fn(),
}));

vi.mock('@/src/shared/ui/dialog', () => ({
  DialogClose: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-close">{children}</div>
  ),
}));

vi.mock('@/src/entities/skill', () => ({
  MASTERY_LIST: [
    { label: 'Novice', value: 'NOVICE' },
    { label: 'Advanced', value: 'ADVANCED' },
    { label: 'Expert', value: 'EXPERT' },
  ],
}));

describe('AddSkillForm', () => {
  const mockAddProfileSkillTrigger = vi.fn();
  const mockAddCvSkillTrigger = vi.fn();

  const mockSkills = [
    { id: '1', name: 'React', category: { id: 'cat-1' } },
    { id: '2', name: 'TypeScript', category: null },
  ] as Skill[];

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
    (useAddProfileSkill as Mock).mockReturnValue([mockAddProfileSkillTrigger]);
    (useAddCvSkill as Mock).mockReturnValue([mockAddCvSkillTrigger]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders a disabled AddButton when the skills array is empty', () => {
    render(<AddSkillForm userId="user-123" skills={[]} />);

    expect(screen.getByTitle('disabledButtonTitle')).toBeInTheDocument();
    expect(screen.getByText('addBtn')).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: 'confirmButton' })).not.toBeInTheDocument();
  });

  it('renders the form correctly when skills are provided', () => {
    render(<AddSkillForm userId="user-123" skills={mockSkills} />);

    expect(screen.getByText('skillLabel')).toBeInTheDocument();
    expect(screen.getByText('masterLabel')).toBeInTheDocument();

    expect(screen.getAllByRole('combobox')).toHaveLength(2);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    expect(submitBtn).toBeDisabled();
  });

  it('submits a Profile skill correctly based on ProfilePage mood', async () => {
    const user = userEvent.setup();
    render(<AddSkillForm userId="user-123" skills={mockSkills} mood="ProfilePage" />);

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);

    const reactOption = await screen.findByRole('option', { name: 'React' });
    await user.click(reactOption);

    await user.click(comboboxes[1]);
    const expertOption = await screen.findByRole('option', { name: 'Expert' });
    await user.click(expertOption);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockAddProfileSkillTrigger).toHaveBeenCalledWith({
        variables: {
          skill: {
            userId: 'user-123',
            name: 'React',
            categoryId: 'cat-1',
            mastery: 'EXPERT',
          },
        },
      });
      expect(mockAddCvSkillTrigger).not.toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  it('submits a CV skill correctly based on CvPage mood', async () => {
    const user = userEvent.setup();
    render(<AddSkillForm userId="user-123" skills={mockSkills} mood="CvPage" cvId="cv-999" />);

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[0]);
    const tsOption = await screen.findByRole('option', { name: 'TypeScript' });
    await user.click(tsOption);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockAddCvSkillTrigger).toHaveBeenCalledWith({
        variables: {
          skill: {
            cvId: 'cv-999',
            name: 'TypeScript',
            categoryId: null,
            mastery: Mastery.Novice,
          },
        },
      });
      expect(mockAddProfileSkillTrigger).not.toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
