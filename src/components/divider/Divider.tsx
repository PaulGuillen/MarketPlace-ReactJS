// src/components/Divider.tsx
import React from "react";

interface DividerProps {
  height: string;
}

const Divider: React.FC<DividerProps> = ({ height }) => {
  return (
    <div
      style={{
        width: "100%",
        height: height,
        backgroundColor: "#d3d3d3",
      }}
    ></div>
  );
};

export default Divider;
