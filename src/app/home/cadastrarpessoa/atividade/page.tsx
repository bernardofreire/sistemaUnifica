'use client';

import React, { useEffect, useState } from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';

const Atividade = () => {
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nomeAtividade: '',
    turno: '',
    dia: '',
    horario: '',
  });

  // Efeito para inicializar o estado com os dados do cadastro
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      nomeAtividade: cadastroData.atividade.nomeAtividade || '',
      turno: cadastroData.atividade.turno || '',
      dia: cadastroData.atividade.dia || '',
      horario: cadastroData.atividade.horario || '',
    }));
  }, [cadastroData.atividade]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Atualiza os dados no contexto ao alterar os campos
    updateCadastroData('atividade', {
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('atividade', formData); // Atualizar os dados basicos na etapa de envio teste
    router.push('/home/cadastrarpessoa/concluido');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='h-60'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput
            label="Atividade"
            name="nomeAtividade"
            placeholder="Selecione a atividade"
            value={formData.nomeAtividade}
            onChange={handleChange}
          />
          <FormInput
            label="Turno"
            name="turno"
            placeholder="Selecione o turno"
            value={formData.turno}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput
            label="Dia"
            name="dia"
            placeholder="Selecione o dia desejado"
            value={formData.dia}
            onChange={handleChange}
          />
          <FormInput
            label="Horário"
            name="horario"
            placeholder="Selecione a hora desejada"
            value={formData.horario}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <NavigationButton href="/home/cadastrarpessoa/responsavel" text="Voltar" />
        <NavigationButton href="/home/cadastrarpessoa/concluido" text="Concluir" />
      </div>
    </form>
  );
};

export default Atividade;
