'use client'

import React from 'react';
import { CadastroUsuarioProvider } from '@/context/CadastroUsuarioContext';
import Menu from '../../components/template/Menu/Menu';
import Titulo from '@/components/template/title_home';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutHome = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  // Define o título dinamicamente com base na rota
  const getTitleAndStep = () => {
    switch (pathname) {
      case '/home/cadastrarpessoa/dadosbasicos':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (1)" };
      case '/home/cadastrarpessoa/infoadd':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (2)" };
      case '/home/cadastrarpessoa/endereco':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (3)" };
      case '/home/cadastrarpessoa/contato':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (4)" };
      case '/home/cadastrarpessoa/responsavel':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (5)" };
      case '/home/cadastrarpessoa/atividade':
        return { titulo: "Cadastrar Pessoa", etapa: "Etapa (6)" };
      case '/home/cadastrarpessoa/concluido':
        return { titulo: "Cadastrar Pessoa", etapa: "Concluir" };
      case '/home/registraratividade':
        return { titulo: "Registrar Pessoas", etapa: "" };
      case '/home/visualizarpessoas':
        return { titulo: "Visualizar Pessoas", etapa: "" };
      case '/home/cadastrarusuario':
        return { titulo: "Cadastrar Usuário", etapa: "" };
      default:
        return { titulo: "Título Padrão", etapa: "" };
    }
  }

  const { titulo, etapa } = getTitleAndStep();

  return (


    <CadastroUsuarioProvider>
      <div className='flex'>
        <Menu />
        <div className='w-full h-screen py-5 px-10 bg-gray-100/90'>
          <div className='w-full flex items-center justify-center'>
            <Titulo titulo={titulo} etapa={etapa} />
          </div>
          <div className='bg-white py-10 mt-10 rounded shadow-sm'>
            {children}
          </div>
        </div>
      </div>
    </CadastroUsuarioProvider>
  );
}

export default LayoutHome;
