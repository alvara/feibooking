import type { User } from 'payload/generated-types';

type PayloadPatchResponse = {
  message: string;
  doc: User;
};

// This function is used to change the selected profile for a user
// It takes the profileId and the user object as arguments
// It makes a PATCH request to the /api/users/:userId endpoint
// with the selectedProfile field set to the new profileId
// It returns the new selected profile
export async function changeSelectedProfile({
  profileId,
  userId,
}: {
  profileId: string;
  userId: string;
}) {
  const req = await fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      selectedProfile: profileId,
    }),
  });

  if (!req.ok) {
    throw new Error('Network response was not ok');
  }

  const data = (await req.json()) as PayloadPatchResponse;
  return data.doc.selectedProfile;
}
