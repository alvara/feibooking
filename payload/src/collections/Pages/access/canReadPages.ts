import type { Access } from 'payload/config';
export const canReadPages: Access = (args) => {
  const { data } = args;
  console.log('canReadPages', data);
  // TODO: only published pags can be read
  return true;
};
