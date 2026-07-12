import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { PasswordResetForm } from './PasswordResetForm';
import { useResetPasswordHook } from '../api/reset-password';
import { useSearchParams } from 'next/navigation';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: vi.fn(),
}));

vi.mock('../api/reset-password', () => ({
  useResetPasswordHook: vi.fn(),
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

describe('PasswordResetForm', () => {
  const mockResetPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useResetPasswordHook as Mock).mockReturnValue([mockResetPassword, { loading: false }]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form correctly', () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    render(<PasswordResetForm />);

    expect(screen.getByLabelText('passwordPlaceholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submitButton' })).toBeInTheDocument();
  });

  it('shows validation errors when password is empty', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('passwordRequired')).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('shows validation error when password is too short', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const passwordInput = screen.getByLabelText('passwordPlaceholder');
    await user.type(passwordInput, 'short');

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('passwordTooShort')).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
  });

  it('shows "actionExpired" error when token is missing', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => null,
    });

    const user = userEvent.setup();
    render(<PasswordResetForm />);

    const passwordInput = screen.getByLabelText('passwordPlaceholder');
    await user.type(passwordInput, 'password123');

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('actionExpired')).toBeInTheDocument();
    });

    expect(mockResetPassword).not.toHaveBeenCalled();
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('submits successfully with token and redirects to login', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    const user = userEvent.setup();

    mockResetPassword.mockResolvedValueOnce({
      data: { resetPassword: { success: true } },
    });

    render(<PasswordResetForm />);

    await user.type(screen.getByLabelText('passwordPlaceholder'), 'password123');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        variables: { auth: { newPassword: 'password123' } },
        context: {
          headers: {
            Authorization: 'mock-token',
          },
        },
      });
    });

    expect(mockReplace).toHaveBeenCalledWith('/auth/login');
  });

  it('displays "actionExpired" error when GraphQL error contains "action expired"', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    const user = userEvent.setup();

    mockResetPassword.mockRejectedValueOnce({
      errors: [{ message: 'Action expired' }],
    });

    render(<PasswordResetForm />);

    await user.type(screen.getByLabelText('passwordPlaceholder'), 'password123');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(screen.getByText('actionExpired')).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('displays generic server error for unknown errors', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    const user = userEvent.setup();

    mockResetPassword.mockRejectedValueOnce(new Error('Network error'));

    render(<PasswordResetForm />);

    await user.type(screen.getByLabelText('passwordPlaceholder'), 'password123');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(screen.getByText('uninspectedServerError')).toBeInTheDocument();
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('disables submit button while loading', async () => {
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => (key === 'token' ? 'mock-token' : null),
    });

    (useResetPasswordHook as Mock).mockReturnValue([mockResetPassword, { loading: true }]);

    render(<PasswordResetForm />);

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    expect(submitBtn).toBeDisabled();
  });
});
