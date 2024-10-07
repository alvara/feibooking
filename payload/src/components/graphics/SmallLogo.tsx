import React from 'react';
import img from '../../assets/logos/logo.png';
import { useHistory } from 'react-router-dom';

export function SmallLogo() {
  const history = useHistory();

  return (
    <img
      src={`${img}`}
      onClick={() => {
        history.push('/admin');
      }}
      alt="Small Logo"
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '1.9em',
        objectFit: 'contain',
        display: 'block',
        margin: 'auto',
        cursor: 'pointer',
      }}
    />
  );
}
