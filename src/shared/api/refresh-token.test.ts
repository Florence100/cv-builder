import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { refreshTokens } from './refresh-token';
global.fetch = vi.fn();

describe('refreshTokens', () => {
  const mockApiUrl = 'https://mock-api.example.com/graphql';
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();

    process.env = { ...originalEnv, NEXT_PUBLIC_GRAPHQL_API_URL: mockApiUrl };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns access and refresh tokens on a successful request', async () => {
    const mockResponse = {
      data: {
        updateToken: {
          access_token: 'new-access-token',
          refresh_token: 'new-refresh-token',
        },
      },
    };

    (global.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await refreshTokens('valid-old-token');

    expect(result).toEqual({
      access_token: 'new-access-token',
      refresh_token: 'new-refresh-token',
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(mockApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer valid-old-token',
      },
      body: expect.stringContaining('mutation RefreshSession'),
    });
  });

  it('throws an error when the response contains GraphQL errors', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        errors: [{ message: 'Invalid or expired token' }],
      }),
    });

    await expect(refreshTokens('expired-token')).rejects.toThrow('Refresh failed');
  });

  it('throws an error when data.updateToken is missing from the response', async () => {
    (global.fetch as Mock).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce({
        data: null,
      }),
    });

    await expect(refreshTokens('some-token')).rejects.toThrow('Refresh failed');
  });
});
