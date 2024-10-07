'use client';

import React, { useEffect, useState } from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';

const Endereco = () => {
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  const [formData, setFormData] = useState({
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    cep: '',
  });

  // Efeito para inicializar o estado com os dados do cadastro
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      endereco: cadastroData.enderecoPessoa.endereco || '',
      numero: cadastroData.enderecoPessoa.numero || '',
      bairro: cadastroData.enderecoPessoa.bairro || '',
      cidade: cadastroData.enderecoPessoa.cidade || '',
      cep: cadastroData.enderecoPessoa.cep || '',
    }));
  }, [cadastroData.enderecoPessoa]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Atualiza os dados no contexto ao alterar os campos
    updateCadastroData('enderecoPessoa', {
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('enderecoPessoa', formData); // Atualizar os dados basicos na etapa de envio teste
    router.push('/home/cadastrarpessoa/contato');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='h-60'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput label="Endereço" name="endereco" placeholder="Digite o endereço" value={formData.endereco} onChange={handleChange} />
          <div className='flex gap-5'>
            <FormInput label="Nº" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} />
            <FormInput label="Bairro" name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput label="Cidade" name="cidade" placeholder="Digite a cidade" value={formData.cidade} onChange={handleChange} />
          <FormInput label="CEP" name="cep" placeholder="Digite o CEP" value={formData.cep} onChange={handleChange} />
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <NavigationButton href="/home/cadastrarpessoa/infoadd" text="Voltar" />
        <NavigationButton type='submit' href="/home/cadastrarpessoa/contato" text="Avançar" />
      </div>
    </form>
  )
}

export default Endereco