import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

/*
 * Hello: one greeting per signed-in user.
 *
 * Access patterns:
 *   AP1  List the signed-in user's Hello records (owner-scoped list).
 *   AP2  Create a Hello record for the signed-in user.
 * No cross-user or public reads.
 *
 * allow.owner() adds an `owner` field set from the Cognito identity, and
 * AppSync only returns or mutates records the caller owns. The owner-scoped
 * list is a filtered scan, which is fine at hello-world scale. If the table
 * grows, add a secondary index on `owner`.
 */
const schema = a.schema({
  Hello: a
    .model({
      message: a.string().required(),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
