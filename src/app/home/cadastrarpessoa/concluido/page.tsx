'use client';

import React from 'react';
import Image from 'next/image';
import NavigationButton from '@/components/template/botao';
import { useCadastro } from '@/context/CadastroContext';
import { useRouter } from 'next/navigation'; // Hook para navegação
import { database } from '@/server/firebaseConfig'; // Importando a configuração do Firebase
import { ref, set, push } from 'firebase/database'; // Importando funções do Realtime Database

const Concluido = () => {
  const { cadastroData, clearCadastroData } = useCadastro(); // Pega os dados e a função para limpar
  const router = useRouter(); // Instância do hook de navegação

  const handleConfirmClick = async () => {
    // Log dos dados inseridos
    console.log('Dados inseridos nas etapas anteriores:', cadastroData);
    console.log('Nome:', cadastroData.dadosBasicos.primeiroNome);

    // Enviar dados para o Firebase
    try {
      const newPersonRef = push(ref(database, 'pessoas'));
      
      // Cria um objeto com os dados, verificando se cada propriedade está definida
      const personData = {
        primeiroNome: cadastroData.dadosBasicos.primeiroNome || '', // Usa string vazia se undefined
        ultimoNome: cadastroData.dadosBasicos.ultimoNome || '',
        dataNasc: cadastroData.dadosBasicos.dataNasc || '',
        cpf: cadastroData.dadosBasicos.cpf || '',
        cadastroUnico: cadastroData.infoAdicionais.cadastroUnico || '',
        nis: cadastroData.infoAdicionais.nis || '',
        escola: cadastroData.infoAdicionais.escola || '',
        tipoSanguineo: cadastroData.infoAdicionais.tipoSanguineo || '',
        endereco: cadastroData.enderecoPessoa.endereco || '',
        numero: cadastroData.enderecoPessoa.numero || '',
        bairro: cadastroData.enderecoPessoa.bairro || '',
        cidade: cadastroData.enderecoPessoa.cidade || '',
        cep: cadastroData.enderecoPessoa.cep || '',
        email: cadastroData.contato.email || '',
        idade: cadastroData.contato.idade || null, 
        telResidencial: cadastroData.contato.telResidencial || '',
        telContato: cadastroData.contato.telContato || '',
        celular: cadastroData.contato.celular || '',
        nomeResponsavel: cadastroData.responsavel.nomeResponsavel || '',
        rgResponsavel: cadastroData.responsavel.rgResponsavel || '',
        grauParentesco: cadastroData.responsavel.grauParentesco || '',
        telContatoResponsavel: cadastroData.responsavel.telContatoResponsavel || '',
        celularResponsavel: cadastroData.responsavel.celularResponsavel || '',
        nomeAtividade: cadastroData.atividade.nomeAtividade || '',
        turno: cadastroData.atividade.turno || '',
        dia: cadastroData.atividade.dia || '',
        horario: cadastroData.atividade.horario || '',
      };
      
      // Envia os dados para o Firebase
      await set(newPersonRef, personData);
      console.log('Dados enviados com sucesso para o Firebase!');
    } catch (e) {
      console.error('Erro ao enviar dados para o Firebase: ', e);
    }
  

    // Limpa os dados do cadastro
    clearCadastroData();

    // Redireciona para a página inicial dos dados básicos
    router.push('/home/cadastrarpessoa/dadosbasicos');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6">
        <Image
          src="/images/concluido.svg"
          alt="Imagem de confirmação"
          width={180}
          height={180}
          draggable={false}
        />
      </div>
      <div>
        {/* Usando o onClick no botão */}
        <NavigationButton text="Confirmar" onClick={handleConfirmClick} />
      </div>
    </div>
  );
};

export default Concluido;
