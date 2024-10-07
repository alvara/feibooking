// Retrieve the CSRF token from cookies
export const getCsrfToken = () => {
  const csrfToken = document.cookie.split('; ').find((row) => row.startsWith('csrftoken='));
  return csrfToken ? csrfToken.split('=')[1] : null;
};
