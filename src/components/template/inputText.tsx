// components/FormInput.js
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import classNames from 'classnames';

// Tipos das propriedades do componente FormInput
interface FormInputProps {
  label?: string;
  name: string;
  placeholder: string;
  type?: string;
  className?: string;
  value?: string; // Adicionado para permitir valores controlados
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para detectar mudança de valor
}

const FormInput: React.FC<FormInputProps> = ({ label, type = "text", name, placeholder, className, value, onChange }) => {
  return (
    <div className={classNames("grid w-full items-center gap-1.5", className)}>
      <Label>{label}</Label>
      <Input
        className="focus:border-lime-600"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value} // Passar valor controlado
        onChange={onChange} // Passar função para mudança de valor
      />
    </div>
  );
};

export default FormInput;
