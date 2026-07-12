import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { LoginForm } from './LoginForm';
import { useLogin } from '../api/api';
import { setAuthCookies } from '@/src/shared/lib/actions';
import Cookies from 'js-cookie';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

vi.mock('../api/api', () => ({
  useLogin: vi.fn(),
}));

vi.mock('@/src/shared/lib/actions', () => ({
  setAuthCookies: vi.fn(),
}));

vi.mock('js-cookie', () => ({
  default: { set: vi.fn() },
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

describe('LoginForm', () => {
  const mockLoginTrigger = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useLogin as Mock).mockReturnValue([mockLoginTrigger, { loading: false }]);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('emailPlaceholder')).toBeInTheDocument();
    expect(screen.getByLabelText('passwordPlaceholder')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'submitButton' })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('emailRequired')).toBeInTheDocument();
      expect(screen.getByText('passwordRequired')).toBeInTheDocument();
    });

    expect(mockLoginTrigger).not.toHaveBeenCalled();
  });

  it('shows an error for an invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('emailPlaceholder');
    await user.type(emailInput, 'invalid-email');

    const submitBtn = screen.getByRole('button', { name: 'submitButton' });
    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('emailInvalid')).toBeInTheDocument();
    });
  });

  it('submits the form successfully and redirects', async () => {
    const user = userEvent.setup();

    mockLoginTrigger.mockResolvedValueOnce({
      data: {
        login: {
          access_token: 'mock-access',
          refresh_token: 'mock-refresh',
          user: { id: 'user-123' },
        },
      },
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText('emailPlaceholder'), 'test@example.com');
    await user.type(screen.getByLabelText('passwordPlaceholder'), 'password123');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(mockLoginTrigger).toHaveBeenCalledWith({
        variables: { auth: { email: 'test@example.com', password: 'password123' } },
      });
    });

    await waitFor(() => {
      expect(setAuthCookies).toHaveBeenCalledWith({
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh',
      });
      expect(Cookies.set).toHaveBeenCalledWith('userId', 'user-123', { expires: 1 });
      expect(mockReplace).toHaveBeenCalledWith('/users/user-123/profile');
    });
  });

  it('displays a server error on invalid credentials', async () => {
    const user = userEvent.setup();

    mockLoginTrigger.mockRejectedValueOnce({
      errors: [{ message: 'Invalid credentials' }],
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText('emailPlaceholder'), 'wrong@example.com');
    await user.type(screen.getByLabelText('passwordPlaceholder'), 'wrongpass');
    await user.click(screen.getByRole('button', { name: 'submitButton' }));

    await waitFor(() => {
      expect(screen.getByText('invalidCredentials')).toBeInTheDocument();
    });
  });
});
