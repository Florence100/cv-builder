import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, Mock } from 'vitest';
import { UpdateSkillForm } from './UpdateSkillForm';
import { useUpdateProfileSkill, useUpdateCvSkill } from '../api/mutations';
import { SkillMastery } from 'cv-graphql';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockRefresh = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh: mockRefresh }),
}));

vi.mock('../api/mutations', () => ({
  useUpdateProfileSkill: vi.fn(),
  useUpdateCvSkill: vi.fn(),
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

// Mock cv-graphql to ensure Mastery enum resolves properly and prevents uncontrolled inputs
vi.mock('cv-graphql', () => ({
  Mastery: {
    NOVICE: 'NOVICE',
    ADVANCED: 'ADVANCED',
    EXPERT: 'EXPERT',
  },
}));

describe('UpdateSkillForm', () => {
  const mockUpdateProfileSkillTrigger = vi.fn();
  const mockUpdateCvSkillTrigger = vi.fn();
  const mockSetIsUpdatedMode = vi.fn();

  const mockSkill = {
    name: 'React',
    categoryId: 'cat-1',
    mastery: 'NOVICE',
  } as unknown as SkillMastery;

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
    (useUpdateProfileSkill as Mock).mockReturnValue([mockUpdateProfileSkillTrigger]);
    (useUpdateCvSkill as Mock).mockReturnValue([mockUpdateCvSkillTrigger]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form correctly with default values', () => {
    render(
      <UpdateSkillForm
        userId="user-123"
        skill={mockSkill}
        setIsUpdatedMode={mockSetIsUpdatedMode}
      />
    );

    expect(screen.getByText('skillLabel')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('masterLabel')).toBeInTheDocument();

    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes).toHaveLength(2);
    expect(comboboxes[0]).toBeDisabled();
    expect(comboboxes[1]).toBeEnabled();

    // react-hook-form initializes isValid to false by default until validated
    expect(screen.getByRole('button', { name: 'confirmButton' })).toBeDisabled();
  });

  it('submits a Profile skill update successfully', async () => {
    const user = userEvent.setup();
    render(
      <UpdateSkillForm
        userId="user-123"
        skill={mockSkill}
        setIsUpdatedMode={mockSetIsUpdatedMode}
        mood="ProfilePage"
      />
    );

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[1]);

    const expertOption = await screen.findByRole('option', { name: 'Expert' });
    await user.click(expertOption);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateProfileSkillTrigger).toHaveBeenCalledWith({
        variables: {
          skill: {
            userId: 'user-123',
            name: 'React',
            categoryId: 'cat-1',
            mastery: 'EXPERT',
          },
        },
      });
      expect(mockUpdateCvSkillTrigger).not.toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockSetIsUpdatedMode).toHaveBeenCalledWith(false);
    });
  });

  it('submits a CV skill update successfully', async () => {
    const user = userEvent.setup();
    render(
      <UpdateSkillForm
        userId="user-123"
        skill={mockSkill}
        setIsUpdatedMode={mockSetIsUpdatedMode}
        mood="CvPage"
        cvId="cv-999"
      />
    );

    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[1]);

    const advancedOption = await screen.findByRole('option', { name: 'Advanced' });
    await user.click(advancedOption);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateCvSkillTrigger).toHaveBeenCalledWith({
        variables: {
          skill: {
            cvId: 'cv-999',
            name: 'React',
            categoryId: 'cat-1',
            mastery: 'ADVANCED',
          },
        },
      });
      expect(mockUpdateProfileSkillTrigger).not.toHaveBeenCalled();
      expect(mockRefresh).toHaveBeenCalled();
      expect(mockSetIsUpdatedMode).toHaveBeenCalledWith(false);
    });
  });

  it('calls setIsUpdatedMode(false) even if the mutation fails', async () => {
    mockUpdateProfileSkillTrigger.mockRejectedValueOnce(new Error('API Error'));
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <UpdateSkillForm
        userId="user-123"
        skill={mockSkill}
        setIsUpdatedMode={mockSetIsUpdatedMode}
      />
    );

    // We MUST interact with the form to enable the submit button first
    const comboboxes = screen.getAllByRole('combobox');
    await user.click(comboboxes[1]);
    const expertOption = await screen.findByRole('option', { name: 'Expert' });
    await user.click(expertOption);

    const submitBtn = screen.getByRole('button', { name: 'confirmButton' });
    expect(submitBtn).toBeEnabled();
    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockSetIsUpdatedMode).toHaveBeenCalledWith(false);
    });

    consoleSpy.mockRestore();
  });
});
