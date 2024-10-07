"use client"

import * as React from "react"
import { useRouter } from 'next/navigation'; // Importando o useRouter
import { Progress } from "@/components/ui/progress"

const ProgressLoad = () => {
    const [progress, setProgress] = React.useState(0);
    const router = useRouter(); // Inicializando o router

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                // Se o progresso atingir 100, redireciona para a rota desejada
                if (prev >= 100) {
                    clearInterval(timer); // Limpa o intervalo
                    router.push('/home/cadastrarpessoa/dadosbasicos'); // Redireciona
                }
                return prev < 100 ? prev + 1 : 100; // Incrementa até 100%
            });
        }, 5); // Aumenta a cada 50ms (ajuste a velocidade aqui)

        return () => clearInterval(timer); // Limpa o intervalo ao desmontar
    }, [router]); // Adicionando o router como dependência

    return <Progress value={progress} className="w-[60%]" />
}

export default ProgressLoad;
