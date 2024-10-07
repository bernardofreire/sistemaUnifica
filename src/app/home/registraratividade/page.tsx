'use client';

import React, { useState, useEffect } from 'react';
import FormSelect from '@/components/template/inputSelect';
import Dialog from '@/components/template/Dialog';
import FormInput from '@/components/template/inputText';
import { TableDemo } from '@/components/template/TabelaAtividade';
import { db } from "@/server/firebaseConfig"; // Importa o Firestore
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const RegistrarAtividade = () => {
    const [atividades, setAtividades] = useState([]);
    const [pesquisar, setPesquisar] = useState("");
    const [turno, setTurno] = useState("");

    // Efeito para buscar atividades do Firestore ao montar o componente
    useEffect(() => {
        const fetchAtividades = async () => {
            const querySnapshot = await getDocs(collection(db, "atividades"));
            const atividadesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAtividades(atividadesData);
        };

        fetchAtividades();
    }, []);

    // Função para adicionar uma nova atividade
    const adicionarAtividade = (novaAtividade) => {
        setAtividades([...atividades, novaAtividade]);
    };

    // Função para excluir uma atividade
    const excluirAtividade = async (atividadeParaExcluir) => {
        try {
            const docRef = doc(db, "atividades", atividadeParaExcluir.id); // Referência do documento a ser excluído
            await deleteDoc(docRef); // Exclui do Firestore
            setAtividades(atividades.filter(a => a.id !== atividadeParaExcluir.id)); // Atualiza o estado
        } catch (error) {
            console.error("Erro ao excluir a atividade:", error);
        }
    };

    // Filtra atividades com base no valor de pesquisa
    const atividadesFiltradas = atividades.filter(a =>
        a.atividade.toLowerCase().includes(pesquisar.toLowerCase())
    );

    return (
        <>
            <div className='px-20'>
                <div className='flex max-w-xs gap-7 items-end'>
                    <Dialog onAdd={adicionarAtividade} atividades={atividades} />
                    {/* Comentado para simplificação */}
                    {/* <FormSelect
                        name="turno"
                        placeholder="Selecione o turno"
                        items={[
                            { value: "dia", label: "Dia" },
                            { value: "tarde", label: "Tarde" },
                            { value: "noite", label: "Noite" }
                        ]}
                        onChange={(value) => setTurno(value)}
                    />
                    <FormInput
                        name="pesquisar"
                        placeholder="Digite uma atividade"
                        value={pesquisar}
                        onChange={(e) => setPesquisar(e.target.value)}
                    /> */}
                </div>
                <div className='w-full mt-10'>
                    <TableDemo atividades={atividadesFiltradas} onDelete={excluirAtividade} />
                </div>
            </div>
        </>
    );
};

export default RegistrarAtividade;
