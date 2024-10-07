import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Bttn from '@/components/template/botao';
import FormSelect from '@/components/template/inputSelect';
import { useState } from 'react';
import { database } from "@/server/firebaseConfig"; // Importa a instância do Realtime Database
import { ref, set, get, child } from "firebase/database";

export default function DialogDemo({ onAdd, atividades = [] }) { // Adiciona um valor padrão como array
    const [atividade, setAtividade] = useState("");
    const [turno, setTurno] = useState("");
    const [open, setOpen] = useState(false); // Estado para controlar a abertura do diálogo

    const handleAdd = async () => {
        if (atividade && turno) {
            const atividadesRef = ref(database, "atividades");

            // Verifica se a atividade já existe
            const snapshot = await get(child(atividadesRef, `${atividade}_${turno}`));
            if (!snapshot.exists()) {
                // Se não existe, adiciona a nova atividade
                await set(ref(database, `atividades/${atividade}_${turno}`), {
                    atividade,
                    turno,
                });

                onAdd({ atividade, turno });
                setAtividade("");
                setTurno("");
                setOpen(false); // Fecha o diálogo após adicionar a atividade
            } else {
                alert("Essa atividade já existe!");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Bttn text="Criar nova Atividade" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Atividade</DialogTitle>
                    <DialogDescription>
                        Aqui você pode registrar uma nova atividade.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="atividade" className="text-right">
                            Atividade
                        </Label>
                        <Input
                            id="atividade"
                            value={atividade}
                            onChange={(e) => setAtividade(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="turno" className="text-right">
                            Turno
                        </Label>
                        <div className="col-span-3">
                            <FormSelect
                                name="turno"
                                placeholder="Selecione o turno"
                                items={[
                                    { value: "dia", label: "Dia" },
                                    { value: "tarde", label: "Tarde" },
                                    { value: "noite", label: "Noite" }
                                ]}
                                value={turno}
                                onChange={setTurno}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd}>Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
