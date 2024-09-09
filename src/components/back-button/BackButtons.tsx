import React from 'react';
import './BackButton.css';

interface BackButtonProps {
  onClick?: () => void; // Función que se ejecutará al hacer clic
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {

  return (
    <button className="back-button" onClick={onClick}>
      ←
    </button>
  );
};

export default BackButton;
