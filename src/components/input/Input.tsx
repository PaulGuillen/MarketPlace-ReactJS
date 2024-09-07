import React, { useEffect } from "react";
import "./Input.css";

interface InputProp {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProp> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  useEffect(() => {
    // Forzar la aplicación de la clase 'has-value' si el valor está presente al cargar el formulario
    const inputElement = document.getElementById(name) as HTMLInputElement;
    if (inputElement && inputElement.value) {
      inputElement.classList.add("has-value");
    }
  }, [value, name]);

  return (
    <div className={`input-group ${value ? "has-value" : ""}`}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={name}>{placeholder}</label>
    </div>
  );
};

export default Input;
