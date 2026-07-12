import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { PasswordRecoveryForm } from './PasswordRecoveryForm';
import { useForgotPasswordHook } from '../api/forgot-password';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock('../api/forgot-password', () => ({
  useForgotPasswordHook: vi.fn(),
}));

vi.mock('@apollo/client', () => ({
  CombinedGraphQLErrors: {
    is: (error: unknown) =>
      typeof error === 'object' &&
      error !== null &&
      'errors' in error &&
      Array.isArray((error as Record<string, unknown>).errors),
  },
}));

describe('PasswordRecoveryForm', () => {
  const mockForgotPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useForgotPasswordHook as Mock).mockReturnValue([mockForgotPassword, { loading: false }]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form correctly', () => {
    render(<PasswordRecoveryForm />);

    expect(screen.getByLabelText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submitButton' })).toBeInTheDocument();
  });

  it('shows validation error when email is empty', async () => {
    const user = userEvent.setup();
    render(<PasswordRecoveryForm />);

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('emailRequired')).toBeInTheDocument();
    });

    expect(mockForgotPassword).not.toHaveBeenCalled();
  });

  it('shows validation error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<PasswordRecoveryForm />);

    const emailInput = screen.getByLabelText('emailPlaceholder');
    await user.type(emailInput, 'invalid-email');

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('emailInvalid')).toBeInTheDocument();
    });

    expect(mockForgotPassword).not.toHaveBeenCalled();
  });

  it('submits successfully and redirects to login', async () => {
    const user = userEvent.setup();

    mockForgotPassword.mockResolvedValueOnce({
      data: { forgotPassword: { success: true } },
    });

    render(<PasswordRecoveryForm />);

    await user.type(screen.getByLabelText('emailPlaceholder'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith({
        variables: { auth: { email: 'test@example.com' } },
      });
    });

    expect(mockReplace).toHaveBeenCalledWith('/auth/login');
  });

  it('displays "noEmail" error when GraphQL error contains "failed to send email"', async () => {
    const user = userEvent.setup();

    mockForgotPassword.mockRejectedValueOnce({
      errors: [{ message: 'Failed to send email' }],
    });

    render(<PasswordRecoveryForm />);

    await user.type(screen.getByLabelText('emailPlaceholder'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(screen.getByText('noEmail')).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('displays generic server error for unknown errors', async () => {
    const user = userEvent.setup();

    mockForgotPassword.mockRejectedValueOnce(new Error('Network error'));

    render(<PasswordRecoveryForm />);

    await user.type(screen.getByLabelText('emailPlaceholder'), 'test@example.com');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(screen.getByText('uninspectedServerError')).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('disables submit button while loading', async () => {
    (useForgotPasswordHook as Mock).mockReturnValue([mockForgotPassword, { loading: true }]);

    render(<PasswordRecoveryForm />);

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    expect(submitBtn).toBeDisabled();
  });
});
