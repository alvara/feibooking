import type { PaginatedDocs } from 'payload/database';
import type { User } from 'payload/dist/auth';
import type { Profile } from 'payload/generated-types';

export async function fetchProfiles({ user }: { user: User }) {
  const res = await fetch(`/api/profiles?where[owner][equals]=${user.id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data: PaginatedDocs<Profile> = await res.json();
  return data;
}
