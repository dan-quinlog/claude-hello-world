import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import { HelloCard } from './HelloCard';

const client = generateClient<Schema>();

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <HelloCard
            api={client.models.Hello}
            name={user?.signInDetails?.loginId ?? 'there'}
          />
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
