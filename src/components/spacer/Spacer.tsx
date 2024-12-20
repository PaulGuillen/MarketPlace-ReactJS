import React from 'react';
import './Spacer.css';

interface SpacerProps {
  height: string;
}

const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <div className="spacer" style={{ height }} />;
};

export default Spacer;
