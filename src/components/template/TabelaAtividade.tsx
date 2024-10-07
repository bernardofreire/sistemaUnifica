import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Bttn from '@/components/template/botao';
import { database } from "@/server/firebaseConfig"; // Importa a instância do Realtime Database
import { ref, remove } from "firebase/database";

export function TableDemo({ atividades, onDelete }) {
    const handleDelete = async (atividadeId) => {
        const activityRef = ref(database, `atividades/${atividadeId}`);
        await remove(activityRef);
        onDelete(atividadeId); // Atualiza a lista de atividades após a exclusão
    };

    return (
        <Table>
            <TableCaption>Atividades registradas</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Atividade</TableHead>
                    <TableHead>Turno</TableHead> {/* Adicionado o cabeçalho para o turno */}
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {atividades.map((atividade) => (
                    <TableRow key={atividade.atividade}> {/* Usar atividade.atividade como chave */}
                        <TableCell className="font-medium">{atividade.atividade}</TableCell> {/* Renderiza a atividade */}
                        <TableCell>{atividade.turno}</TableCell> {/* Renderiza o turno */}
                        <TableCell>
                            <div className="max-w-xs">
                            <Bttn text="Excluir" onClick={() => handleDelete(`${atividade.atividade}_${atividade.turno}`)} />

                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total de Atividades</TableCell>
                    <TableCell className="text-right">{atividades.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
