import React from "react";
import "./Button.css";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    text: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type = "button", text, onClick }) => {
  return (
    <button className="btn" type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;