// context/CadastroContext.tsx
'use client'; // Definido como Client Component

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a interface dos dados que serão armazenados
interface CadastroData {
    dadosBasicos: {
        primeiroNome?: string;
        ultimoNome?: string;
        dataNasc?: string;
        cpf?: string;
    };
    infoAdicionais: {
        cadastroUnico?: string;
        nis?: string;
        escola?: string;
        tipoSanguineo?: string;
    };
    enderecoPessoa: {
        endereco?: string;
        numero?: string;
        bairro?: string;
        cidade?: string;
        cep?: string;
    };
    contato: {
        email?: string;
        idade?: string;
        telResidencial?: string;
        telContato?: string;
        celular?: string;
    };
    responsavel: {
        nomeResponsavel?: string;
        rgResponsavel?: string;
        grauParentesco?: string;
        telContatoResponsavel?: string;
        celularResponsavel?: string;
    };
    atividade: {
        nomeAtividade?: string;
        turno?: string;
        dia?: string;
        horario?: string;
    };
}

// Define a interface para o contexto
interface CadastroContextType {
    cadastroData: CadastroData; // Os dados completos do cadastro
    updateCadastroData: (step: keyof CadastroData, data: Partial<CadastroData[keyof CadastroData]>) => void; // Função de atualização
    clearCadastroData: () => void; // Função para limpar os dados
}

// Cria o contexto inicial com o tipo correto
const CadastroContext = createContext<CadastroContextType | undefined>(undefined);

// Hook para utilizar o contexto
export const useCadastro = (): CadastroContextType => {
    const context = useContext(CadastroContext);
    if (!context) {
        throw new Error('useCadastro must be used within a CadastroProvider');
    }
    return context;
};

// Componente provider que vai envolver a aplicação ou parte dela
export const CadastroProvider = ({ children }: { children: ReactNode }) => {
    // Estado inicial do cadastro
    const [cadastroData, setCadastroData] = useState<CadastroData>({
        dadosBasicos: {},
        infoAdicionais: {},
        enderecoPessoa: {},
        contato: {},
        responsavel: {},
        atividade: {},
    });

    // Função para atualizar os dados de cada etapa com tipagem mais precisa
    const updateCadastroData = (step: keyof CadastroData, data: Partial<CadastroData[keyof CadastroData]>) => {
        console.log("Atualizando dados:", { step, data }); // Log para depuração
        setCadastroData((prevState) => ({
            ...prevState,
            [step]: { ...prevState[step], ...data }, // Atualiza apenas a etapa específica
        }));
    };

    // Função para limpar os dados do cadastro
    const clearCadastroData = () => {
        setCadastroData({
            dadosBasicos: {},
            infoAdicionais: {},
            enderecoPessoa: {},
            contato: {},
            responsavel: {},
            atividade: {},
        });
    };

    return (
        <CadastroContext.Provider value={{ cadastroData, updateCadastroData, clearCadastroData }}>
            {children}
        </CadastroContext.Provider>
    );
};
