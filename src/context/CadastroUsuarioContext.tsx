// context/CadastroUsuarioContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo a interface para os dados do usuário
interface CadastroUsuarioData {
    primeiroNome?: string;
    ultimoNome?: string;
    email?: string;
    senha?: string;
    confirmarSenha?: string;
}

// Definindo a interface para o contexto
interface CadastroUsuarioContextType {
    usuarioData: CadastroUsuarioData; // Dados do usuário
    updateUsuarioData: (data: Partial<CadastroUsuarioData>) => void; // Função para atualizar dados do usuário
    clearUsuarioData: () => void; // Função para limpar dados do usuário
}

// Criando o contexto com valor inicial como undefined
const CadastroUsuarioContext = createContext<CadastroUsuarioContextType | undefined>(undefined);

// Hook personalizado para acessar o contexto
export const useCadastroUsuario = (): CadastroUsuarioContextType => {
    const context = useContext(CadastroUsuarioContext);
    if (!context) {
        throw new Error('useCadastroUsuario must be used within a CadastroUsuarioProvider');
    }
    return context;
};

// Criando o provedor do contexto
export const CadastroUsuarioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Inicializando o estado com um objeto vazio
    const [usuarioData, setUsuarioData] = useState<CadastroUsuarioData>({});

    // Função para atualizar os dados do usuário
    const updateUsuarioData = (data: Partial<CadastroUsuarioData>) => {
        setUsuarioData((prev) => ({ ...prev, ...data }));
    };

    // Função para limpar os dados do usuário
    const clearUsuarioData = () => {
        setUsuarioData({});
    };

    // Retornando o provedor com os valores do contexto
    return (
        <CadastroUsuarioContext.Provider value={{ usuarioData, updateUsuarioData, clearUsuarioData }}>
            {children}
        </CadastroUsuarioContext.Provider>
    );
};
