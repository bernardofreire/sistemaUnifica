'use client';

import React, { useState } from 'react';
import { useCadastroUsuario } from '@/context/CadastroUsuarioContext';
import FormInput from '@/components/template/inputText';
import NavigationButton from '@/components/template/botao';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '@/server/firebaseConfig';
import { ref, set } from 'firebase/database';

const CadastrarUsuario = () => {
  const { usuarioData, updateUsuarioData, clearUsuarioData } = useCadastroUsuario();
  const [formData, setFormData] = useState({
    primeiroNome: usuarioData.primeiroNome || '',
    ultimoNome: usuarioData.ultimoNome || '',
    email: usuarioData.email || '',
    senha: usuarioData.senha || '',
    confirmarSenha: usuarioData.confirmarSenha || '',
  });

  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    updateUsuarioData({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    const { primeiroNome, ultimoNome, email, senha, confirmarSenha } = formData;
    if (!primeiroNome || !ultimoNome || !email || !senha || !confirmarSenha) {
        setError('Por favor, preencha todos os campos.');
        return;
    }

    // Validação da senha
    if (senha !== confirmarSenha) {
        setError('As senhas não correspondem!');
        return;
    }

    // Limpa a mensagem de erro ao submeter com sucesso
    setError(null);

    try {
        // Criar usuário com email e senha
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        
        // Aqui você pode acessar o ID do usuário se necessário
        const userId = userCredential.user.uid;

        // (Opcional) Salvar informações adicionais no banco de dados, se necessário
        const userRef = ref(database, `users/${userId}`);
        await set(userRef, {
            primeiroNome: primeiroNome,
            ultimoNome: ultimoNome,
            email: email,
            lastLogin: new Date().toISOString() // Apenas um exemplo
        });

        console.log('Usuário cadastrado com sucesso:', userId);

        // Limpa os campos de input e os dados no contexto
        setFormData({
            primeiroNome: '',
            ultimoNome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
        });
        clearUsuarioData();
    } catch (error) {
        setError(error.message); // Lida com erros de cadastro
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mt-2 items-center">
        <div className='w-full flex items-center justify-center'>
          <div className="w-full space-y-4 max-w-lg h-full rounded-md p-4">
            <div className='text-3xl text-lime-700 pb-4'>Preencha os dados de cadastro</div>
            {error && <p className="text-red-600">{error}</p>} {/* Mensagem de erro */}

            <FormInput
              label="Primeiro nome"
              name="primeiroNome"
              placeholder="Digite o primeiro nome"
              value={formData.primeiroNome}
              onChange={handleChange}
            />
            <FormInput
              label="Último nome"
              name="ultimoNome"
              placeholder="Digite o último nome"
              value={formData.ultimoNome}
              onChange={handleChange}
            />
            <FormInput
              label="Email"
              name="email"
              placeholder="Digite o email do usuário"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormInput
              label="Senha"
              name="senha"
              placeholder="Digite a senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
            />
            <FormInput
              label="Confirmar senha"
              name="confirmarSenha"
              placeholder="Confirme a senha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
            />
            <NavigationButton type='submit' text="Cadastrar novo usuário" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CadastrarUsuario;
