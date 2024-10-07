"use client";

import React, { useEffect, useState } from 'react'; // Adicione useEffect
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation'; // Atualize a importação para usar next/navigation

const InformacaoAdicional = () => {
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  // Estado local para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    cadastroUnico: '',
    nis: '',
    escola: '',
    tipoSanguineo: '',
  });

  // Efeito para inicializar o estado com os dados do contexto
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      cadastroUnico: cadastroData.infoAdicionais.cadastroUnico || '',
      nis: cadastroData.infoAdicionais.nis || '',
      escola: cadastroData.infoAdicionais.escola || '',
      tipoSanguineo: cadastroData.infoAdicionais.tipoSanguineo || '',
    }));
  }, [cadastroData.infoAdicionais]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    updateCadastroData('infoAdicionais', {
      [name]: value,
    });

  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('infoAdicionais', formData); // Corrigido para atualizar infoAdicionais
    router.push('/home/cadastrarpessoa/endereco'); // Avança para a próxima etapa
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='h-60'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput
            label="CadÚnico"
            name="cadastroUnico"
            placeholder="Digite o cadÚnico"
            value={formData.cadastroUnico}
            onChange={handleChange}
          />
          <FormInput
            label="NIS"
            name="nis"
            placeholder="Digite o NIS"
            value={formData.nis}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput
            label="Escola"
            name="escola"
            placeholder="Digite o nome da escola"
            value={formData.escola}
            onChange={handleChange}
          />
          <FormInput
            label="Tipo Sanguíneo"
            name="tipoSanguineo"
            placeholder="Digite o tipo sanguíneo"
            value={formData.tipoSanguineo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <NavigationButton href="/home/cadastrarpessoa/dadosbasicos" text="Voltar" />
        <NavigationButton type='submit' href="/home/cadastrarpessoa/endereco" text="Avançar" />
      </div>
    </form>
  );
};

export default InformacaoAdicional;
