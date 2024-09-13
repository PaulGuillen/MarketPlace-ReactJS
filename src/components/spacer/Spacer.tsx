import React from 'react';
import './Spacer.css';

interface SpacerProps {
  height: string; // The height can be a string to allow for units (e.g., '20px', '2rem')
}

const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <div className="spacer" style={{ height }} />;
};

export default Spacer;
