"use client"; // Adicione esta linha para indicar que é um Client Component

import React, { useEffect, useState } from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';
import FormSelect from '@/components/template/inputSelect';
import classNames from 'classnames'; // Certifique-se de importar a biblioteca classNames

const Responsavel = () => {
  const [grauParentesco, setGrauParentesco] = useState(''); // Estado para armazenar o valor do select
  const [outroGrau, setOutroGrau] = useState(''); // Estado para armazenar a entrada do campo "Outro"
  const { cadastroData, updateCadastroData } = useCadastro();
  const router = useRouter();

  // Função para manipular a mudança no select
  const handleSelectChange = (value: string) => {
    setGrauParentesco(value);
    // Limpa o campo "outroGrau" se a opção selecionada for diferente de "outros"
    if (value !== 'outros') {
      setOutroGrau(''); // Limpa o campo "outroGrau"
    }
  };

  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    rgResponsavel: '',
    grauParentesco: '',
    telContatoResponsavel: '',
    celularResponsavel: '',
  });

  // Efeito para inicializar o estado com os dados do cadastro
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      nomeResponsavel: cadastroData.responsavel.nomeResponsavel || '',
      rgResponsavel: cadastroData.responsavel.rgResponsavel || '',
      grauParentesco: cadastroData.responsavel.grauParentesco === 'outros' && outroGrau ? outroGrau : cadastroData.responsavel.grauParentesco || '',
      telContatoResponsavel: cadastroData.responsavel.telContatoResponsavel || '',
      celularResponsavel: cadastroData.responsavel.celularResponsavel || '',
    }));
  }, [cadastroData.responsavel, outroGrau]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Atualiza os dados no contexto ao alterar os campos
    updateCadastroData('responsavel', {
      [name]: value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCadastroData('responsavel', {
      ...formData,
      grauParentesco: grauParentesco === 'outros' ? outroGrau : grauParentesco, // Salva o valor correto
    });
    router.push('/home/cadastrarpessoa/concluido');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classNames('grid', { 'h-60': grauParentesco !== 'outros', 'h-80': grauParentesco === 'outros' })}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FormInput className="col-span-2" label="Nome do responsável" name="nomeResponsavel" placeholder="Digite o nome do responsável pela pessoa" value={formData.nomeResponsavel} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput label="RG" name="rgResponsavel" placeholder="RG" value={formData.rgResponsavel} onChange={handleChange} />
          <FormSelect
            label="Grau de parentesco"
            name="grauParentesco"
            placeholder="Selecione o grau"
            items={[
              { value: "pai", label: "Pai" },
              { value: "mae", label: "Mãe" },
              { value: "outros", label: "Outro" }
            ]}
            value={grauParentesco} // Usando o estado local "grauParentesco"
            onChange={(value) => {
              handleSelectChange(value); // Atualiza o estado local
              setFormData((prevData) => ({
                ...prevData,
                grauParentesco: value, // Atualiza o estado formData
              }));
            }} // Passa a função de controle do select
          />
        </div>

        {/* Campo para digitar o grau de parentesco caso "Outro" seja selecionado */}
        {grauParentesco === 'outros' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
            <FormInput
              label="Especificar Grau de Parentesco"
              name="outroGrau"
              placeholder="Digite o grau de parentesco"
              value={outroGrau}
              onChange={(e) => {
                setOutroGrau(e.target.value);
                updateCadastroData('responsavel', { grauParentesco: e.target.value }); // Salva o campo 'outroGrau' no contexto
              }} // Atualiza o valor digitado
            />
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-6">
          <FormInput label="Celular do Responsável" name="celularResponsavel" placeholder="(XX)XXXXX-XXXX" value={formData.celularResponsavel} onChange={handleChange} />
          <FormInput label="Tel. Contato do Responsável" name="telContatoResponsavel" placeholder="(XX)XXXX-XXXX" value={formData.telContatoResponsavel} onChange={handleChange} />
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <NavigationButton href="/home/cadastrarpessoa/contato" text="Voltar" />
        <NavigationButton href="/home/cadastrarpessoa/atividade" text="Avançar" />
      </div>
    </form>
  );
}

export default Responsavel;
