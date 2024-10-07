import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

// Definindo os tipos de props do botão de navegação
type ButtonType = "submit" | "reset" | "button";

interface NavigationButtonProps {
    href?: string; // href agora é opcional
    text: string;
    type?: ButtonType;
    onClick?: () => void; // Adicionando onClick opcional
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ href, text, type = "button", onClick }) => {
  return href ? (
    <Link href={href} passHref>
      <Button type={type} className="bg-lime-600 w-full">
        {text}
      </Button>
    </Link>
  ) : (
    <Button type={type} className="bg-lime-600 w-full" onClick={onClick}>
      {text}
    </Button>
  );
};

export default NavigationButton;
