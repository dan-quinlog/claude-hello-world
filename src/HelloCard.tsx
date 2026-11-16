import { useEffect, useRef, useState } from 'react';

export type Hello = { id: string; message: string };

type Result<T> = { data: T | null; errors?: readonly { message: string }[] };

/** The subset of `client.models.Hello` this component uses. Tests pass a fake. */
export interface HelloApi {
  list(): Promise<Result<Hello[]>>;
  create(input: { message: string }): Promise<Result<Hello>>;
}

type State =
  | { status: 'loading' }
  | { status: 'ready'; hello: Hello }
  | { status: 'error'; message: string };

/** Shows the signed-in user's Hello record, creating one on first visit. */
export function HelloCard({ api, name }: { api: HelloApi; name: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });
  // StrictMode runs effects twice in dev; this keeps us from creating two records.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      const listed = await api.list();
      if (listed.errors?.length) throw new Error(listed.errors[0].message);
      const existing = listed.data?.[0];
      if (existing) return existing;

      const created = await api.create({ message: `Hello, ${name}!` });
      if (created.errors?.length || !created.data) {
        throw new Error(created.errors?.[0]?.message ?? 'Could not create hello');
      }
      return created.data;
    })().then(
      (hello) => setState({ status: 'ready', hello }),
      (err: unknown) =>
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) }),
    );
  }, [api, name]);

  if (state.status === 'loading') return <p>Loading…</p>;
  if (state.status === 'error') return <p role="alert">Error: {state.message}</p>;
  return <h1>{state.hello.message}</h1>;
}
