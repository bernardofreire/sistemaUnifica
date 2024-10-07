'use client';

import React, { useEffect, useState } from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';

const Contato = () => {
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    idade: '',
    telResidencial: '',
    telContato: '',
    celular: '',
  });

  // Efeito para inicializar o estado com os dados do cadastro
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: cadastroData.contato.email || '',
      idade: cadastroData.contato.idade || '',
      telResidencial: cadastroData.contato.telResidencial || '',
      telContato: cadastroData.contato.telContato || '',
      celular: cadastroData.contato.celular || '',
    }));
  }, [cadastroData.contato]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Atualiza os dados no contexto ao alterar os campos
    updateCadastroData('contato', {
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('contato', formData); // Atualizar os dados basicos na etapa de envio teste
    router.push('/home/cadastrarpessoa/responsavel');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='h-60'>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput className="col-span-2" label="E-mail" type="email" name="email" placeholder="Email@email.com" value={formData.email} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput label="Idade Atual" name="idade" placeholder="Ex.:18" value={formData.idade} onChange={handleChange}/>
          <FormInput label="Tel. Residencial" name="telResidencial" placeholder="(XX)XXXX-XXXX" value={formData.telResidencial} onChange={handleChange}/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput label="Celular" name="celular" placeholder="(XX)XXXXX-XXXX" value={formData.celular} onChange={handleChange}/>
          <FormInput label="Tel. Contato" name="telContato" placeholder="(XX)XXXX-XXXX" value={formData.telContato} onChange={handleChange}/>
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <NavigationButton href="/home/cadastrarpessoa/endereco" text="Voltar" />
        <NavigationButton href="/home/cadastrarpessoa/responsavel" text="Avançar" />
      </div>
      </form>
  )
}

export default Contato