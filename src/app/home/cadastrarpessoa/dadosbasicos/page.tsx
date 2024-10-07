'use client';

import React, { useEffect, useState } from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';

const DadosBasicos = () => {
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    dataNasc: '',
    cpf: '',
  });

  // Efeito para inicializar o estado com os dados do cadastro
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      primeiroNome: cadastroData.dadosBasicos.primeiroNome || '',
      ultimoNome: cadastroData.dadosBasicos.ultimoNome || '',
      dataNasc: cadastroData.dadosBasicos.dataNasc || '',
      cpf: cadastroData.dadosBasicos.cpf || '',
    }));
  }, [cadastroData.dadosBasicos]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Atualiza os dados no contexto ao alterar os campos
    updateCadastroData('dadosBasicos', {
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('dadosBasicos', formData); // Atualizar os dados basicos na etapa de envio teste
    router.push('/home/cadastrarpessoa/infoadd');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='h-60'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput
            label="Primeiro Nome"
            name="primeiroNome"
            placeholder="Digite o primeiro nome"
            value={formData.primeiroNome}
            onChange={handleChange}
          />
          <FormInput
            label="Último Nome"
            name="ultimoNome"
            placeholder="Digite o último nome"
            value={formData.ultimoNome}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput
            label="Data de Nascimento"
            name="dataNasc"
            placeholder="DD/MM/AAAA"
            value={formData.dataNasc}
            onChange={handleChange}
          />
          <FormInput
            label="CPF"
            name="cpf"
            placeholder="Digite o CPF"
            value={formData.cpf}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <NavigationButton type='submit' href="/home/cadastrarpessoa/infoadd" text="Avançar" />
      </div>
    </form>
  );
};

export default DadosBasicos;
