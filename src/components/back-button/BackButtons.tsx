import React from 'react';
import './BackButton.css';

interface BackButtonProps {
  onClick?: () => void; 
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {

  return (
    <button className="back-button" onClick={onClick}>
      ←
    </button>
  );
};

export default BackButton;
