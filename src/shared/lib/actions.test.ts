import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cookies } from 'next/headers';
import { setAuthCookies } from './actions';

vi.mock('next/headers', () => {
  const mockSet = vi.fn();
  return {
    cookies: vi.fn().mockResolvedValue({
      set: mockSet,
    }),
  };
});

describe('setAuthCookies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets the access and refresh tokens with the correct configurations', async () => {
    const mockData = {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    };

    await setAuthCookies(mockData);

    const cookieStore = await cookies();

    expect(cookieStore.set).toHaveBeenCalledTimes(2);

    expect(cookieStore.set).toHaveBeenNthCalledWith(1, 'accessToken', 'test-access-token', {
      sameSite: 'lax',
      maxAge: 600, // 10 minutes
      path: '/',
    });

    expect(cookieStore.set).toHaveBeenNthCalledWith(2, 'refreshToken', 'test-refresh-token', {
      sameSite: 'lax',
      maxAge: 604800, // 7 days
      path: '/',
    });
  });
});
