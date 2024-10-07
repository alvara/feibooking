import React from 'react';
import { useDocumentInfo } from 'payload/components/utilities';
import { Button } from 'payload/components';

export const CreateSubCommunityButton: React.FC = () => {
  const { id } = useDocumentInfo();

  const handleClick = () => {
    const searchParams = new URLSearchParams();
    if (id) {
      searchParams.append('parentCommunity', id.toString());
    }
    window.location.href = `/admin/collections/communities/create?${searchParams.toString()}`;
  };

  return (
    <>
      <Button onClick={handleClick}>Create Subcommunity</Button>
    </>
  );
};
