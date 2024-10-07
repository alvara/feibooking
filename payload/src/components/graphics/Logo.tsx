import React from 'react';
import img from '../../assets/logos/logo.png';

export function Logo() {
  return (
    <img
      src={`${img}`}
      alt="Logo"
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '150px',
        objectFit: 'contain',
        display: 'block',
        margin: 'auto',
      }}
    />
  );
}
