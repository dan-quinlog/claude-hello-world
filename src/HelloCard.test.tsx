import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HelloCard, type HelloApi } from './HelloCard';

function fakeApi(overrides: Partial<HelloApi> = {}): HelloApi {
  return {
    list: vi.fn().mockResolvedValue({ data: [] }),
    create: vi.fn(async ({ message }) => ({ data: { id: 'new', message } })),
    ...overrides,
  };
}

describe('HelloCard', () => {
  it('shows a loading state first', () => {
    render(<HelloCard api={fakeApi({ list: () => new Promise(() => {}) })} name="a@b.c" />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it("shows the user's existing hello without creating another", async () => {
    const api = fakeApi({
      list: vi.fn().mockResolvedValue({ data: [{ id: '1', message: 'Hello, existing!' }] }),
    });
    render(<HelloCard api={api} name="a@b.c" />);
    expect(await screen.findByRole('heading', { name: 'Hello, existing!' })).toBeInTheDocument();
    expect(api.create).not.toHaveBeenCalled();
  });

  it('creates a hello on first visit', async () => {
    const api = fakeApi();
    render(<HelloCard api={api} name="a@b.c" />);
    expect(await screen.findByRole('heading', { name: 'Hello, a@b.c!' })).toBeInTheDocument();
    expect(api.create).toHaveBeenCalledExactlyOnceWith({ message: 'Hello, a@b.c!' });
  });

  it('shows API errors', async () => {
    const api = fakeApi({
      list: vi.fn().mockResolvedValue({ data: null, errors: [{ message: 'Unauthorized' }] }),
    });
    render(<HelloCard api={api} name="a@b.c" />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Error: Unauthorized');
  });
});
