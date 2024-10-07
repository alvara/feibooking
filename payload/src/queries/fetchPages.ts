import type { PaginatedDocs } from 'payload/database';
import type { Page, Profile } from 'payload/generated-types';

// "profile_owner" is the relationship field for profile the pages collection
export async function fetchPages({ profile }: { profile: Profile }) {
  const res = await fetch(`/api/pages?where[profile_owner][equals]=${profile.id}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const data: PaginatedDocs<Page> = await res.json();
  return data;
}
