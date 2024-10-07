"use client"; // Adicione esta linha

import React, { useEffect, useState } from 'react';
import FormInput from '@/components/template/inputText';
import Table from '@/components/template/Table';
import { database } from '@/server/firebaseConfig'; // Importando a configuração do Firebase
import { ref, onValue, remove } from 'firebase/database'; // Importando funções do Realtime Database

export function VisualizarPessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    const pessoasRef = ref(database, 'pessoas');
    onValue(pessoasRef, (snapshot) => {
      const data = snapshot.val();
      const pessoasArray = [];
      for (let id in data) {
        pessoasArray.push({ id, ...data[id] });
      }
      setPessoas(pessoasArray);
    });
  }, []);

  // Função para excluir uma pessoa do banco de dados
  const excluirPessoa = async (id: string) => {
    try {
      await remove(ref(database, `pessoas/${id}`)); // Remove a pessoa do Firebase
      setPessoas(pessoas.filter((pessoa) => pessoa.id !== id)); // Remove a pessoa visualmente
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  };

  // Filtrando as pessoas com base na pesquisa
  const pessoasFiltradas = pessoas.filter((pessoa) =>
    `${pessoa.primeiroNome} ${pessoa.ultimoNome}`.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
      <div className='px-20 '>
        <div className='flex max-w-sm gap-7 items-end'>
          <FormInput
            label="Pesquisar"
            name="pesquisar"
            placeholder="Digite uma pessoa"
            onChange={(e) => setPesquisa(e.target.value)} // Atualiza o estado de pesquisa
          />
        </div>
        <div className='w-full mt-10'>
          <div>
            <Table pessoas={pessoasFiltradas} excluirPessoa={excluirPessoa} /> {/* Passando pessoas filtradas para o componente Table */}
          </div>
        </div>
      </div>
    </>
  );
}

export default VisualizarPessoas;
