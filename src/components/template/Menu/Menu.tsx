'use client'

import React, { useState } from 'react';
import Avatar from './Avatar';
import MenuSection from './MenuSection';
import { PlusIcon, UserPlusIcon, UserGroupIcon, ActivityIcon, MenuIcon, CloseIcon } from '../Icons'; // Crie os ícones

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const controleItems = [
    { href: '/home/cadastrarusuario', label: 'Cadastrar Usuario', icon: <PlusIcon /> },
  ];

  const funcionalidadesItems = [
    { href: '/home/cadastrarpessoa/dadosbasicos', label: 'Cadastrar Pessoa', icon: <UserPlusIcon /> },
    { href: '/home/visualizarpessoas', label: 'Visualizar Pessoas', icon: <UserGroupIcon /> },
    { href: '/home/registraratividade', label: 'Registrar Atividade', icon: <ActivityIcon /> },
  ];

  return (
    <div className="w-96 bg-white h-screen shadow-sm relative">
      <button className="md:hidden p-4" onClick={toggleMenu}>
        {isOpen ? <CloseIcon /> : <MenuIcon />} {/* Alterna ícone de abrir/fechar */}
      </button>
      <div className={` h-screen flex flex-col pt-8 space-y-36 w-full ${isOpen ? 'block' : 'hidden'} md:block`}>
        <Avatar />
        <div className="flex flex-col items-center space-y-8">
          <MenuSection title="Controle" items={controleItems} />
          <MenuSection title="Funcionalidades" items={funcionalidadesItems} />
        </div>
      </div>

      {/* Borda gradiente à direita */}
      <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-transparent via-gray-300/60 to-transparent"></div>
      </div>
  );
};

export default Menu;
