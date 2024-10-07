'use client';

import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth, database } from '@/server/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import ErrorDialog from '@/components/template/DialogError'; // Importar o componente de dialog de erro
import ProgressLoad from "@/components/template/ProgressLoad"; // Importando como padrão
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o diálogo de erro
    const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false); // Estado para controlar o diálogo de loading
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            setSuccess('Login bem-sucedido!');

            const userId = userCredential.user.uid;
            const userRef = ref(database, `users/${userId}`);
            await set(userRef, {
                email: email,
                lastLogin: new Date().toISOString()
            });

            // Abrindo o diálogo de loading
            setIsLoadingDialogOpen(true);
        } catch (error) {
            setError(error.message);
            setSuccess(null);
            setIsDialogOpen(true); // Abre o diálogo em caso de erro
        }
    };

    return (
        <main>
            <div className="h-screen flex justify-center items-center">
                <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-4xl h-auto p-6">
                    <div className="p-6">
                        <div className="mb-6 md:mb-0 md:p-6">
                            <Image
                                src="/images/logotipo.svg"
                                alt="Logo"
                                width={300}
                                height={300}
                                draggable={false}
                                className="mx-auto"
                            />
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Image
                            src="/images/vetor.png"
                            alt="Picture of the author"
                            width={5}
                            height={5}
                            draggable={false}
                        />
                    </div>
                    <div className="p-6 flex flex-col gap-7 justify-be h-full">
                        <h1>Login</h1>
                        <form className="flex flex-col w-72 md:w-96 lg:w-72 space-y-2 items-center justify-between" onSubmit={handleSubmit}>
                            <Input
                                className="focus:border-lime-600"
                                name="email"
                                placeholder="Digite o email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                className="focus:border-lime-600"
                                name="senha"
                                type="password"
                                placeholder="Digite a senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            {success && <p className="text-lime-600">{success}</p>}
                            <Button className="bg-lime-600 w-full" type="submit">Conectar</Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Diálogo de Erro */}
            <ErrorDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} errorMessage={error} />

            {/* Diálogo de Carregamento */}
            <Dialog open={isLoadingDialogOpen} onOpenChange={() => setIsLoadingDialogOpen(false)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Carregando...</DialogTitle>
                    </DialogHeader>
                    <ProgressLoad />
                    {/* Aqui você pode adicionar um tempo de espera antes de fechar o diálogo */}
                </DialogContent>
            </Dialog>
        </main>
    );
}
