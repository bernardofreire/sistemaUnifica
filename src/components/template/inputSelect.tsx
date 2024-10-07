import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos das propriedades do componente FormSelect
interface FormSelectProps {
  label?: string;
  placeholder?: string;
  items: { value: string; label: string }[]; // Array de objetos para itens de seleção
  name: string;
  value?: string;
  onChange?: (value: string) => void; // Função onChange para manipular o valor selecionado
}

const FormSelect: React.FC<FormSelectProps> = ({ label, placeholder, items, value, name, onChange }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label className="block text-sm font-medium">{label}</label>
      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map(item => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormSelect;
