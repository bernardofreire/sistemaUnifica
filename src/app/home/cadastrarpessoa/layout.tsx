'use client'

import React from 'react';
import ProgressBar from '@/components/template/ProgressBar';
import { usePathname } from 'next/navigation';
import { CadastroProvider } from '@/context/CadastroContext';


interface LayoutProps {
  children: React.ReactNode;
}

const LayoutCadastroPessoa = ({ children }: LayoutProps) => {
  const pathname = usePathname();

  // Determine a etapa atual com base no pathnames
  const stepIndex = () => {
    if (pathname.includes('/dadosbasicos')) return 1;
    if (pathname.includes('/infoadd')) return 2;
    if (pathname.includes('/endereco')) return 3;
    if (pathname.includes('/contato')) return 4;
    if (pathname.includes('/responsavel')) return 5;
    if (pathname.includes('/atividade')) return 6;
    return 1;
  };

  const isConcluidoPage = pathname.includes('/concluido');

  return (
    
    <CadastroProvider>
      <div className="flex flex-col mt-2 items-center">
        <div className='w-full flex items-center justify-center'>
          <div className="w-full  max-w-4xl h-full rounded-md p-4">

            {/* Exibe a progress bar apenas se não estiver na página "concluido" */}
            {!isConcluidoPage && (
              <div className="h-12  mb-4  pb-20 rounded-md flex items-center justify-center">
               <ProgressBar currentStep={stepIndex()} />
              </div>
            )}

            {/* Container principal que recebe conteúdo das páginas */}
            <div className="flex-1 rounded-md p-4 flex flex-col items-center">
              <div className="w-full lg:w-5/6 p-6 rounded-md space-y-6">
                {children} {/* Aqui entra o conteúdo específico de cada etapa */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CadastroProvider>
  );
};

export default LayoutCadastroPessoa;
