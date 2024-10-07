import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table as RadixTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Pessoa {
  id: string;
  primeiroNome: string;
  ultimoNome: string;
  nomeAtividade: string;
  turno: string;
  dia: string;
}

interface TableProps {
  pessoas: Pessoa[];
  excluirPessoa: (id: string) => void;
}

const Table = ({ pessoas, excluirPessoa }: TableProps) => {
  const [pessoaParaExcluir, setPessoaParaExcluir] = useState<Pessoa | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar o diálogo

  const handleDelete = () => {
    if (pessoaParaExcluir) {
      excluirPessoa(pessoaParaExcluir.id);
      setPessoaParaExcluir(null); // Limpa a pessoa selecionada
      setIsDialogOpen(false); // Fecha o diálogo
    }
  };

  const openDialog = (pessoa: Pessoa) => {
    setPessoaParaExcluir(pessoa);
    setIsDialogOpen(true); // Abre o diálogo
  };

  const closeDialog = () => {
    setPessoaParaExcluir(null);
    setIsDialogOpen(false); // Fecha o diálogo
  };

  return (
    <RadixTable>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Sobrenome</TableHead>
          <TableHead>Atividade</TableHead>
          <TableHead>Turno</TableHead>
          <TableHead>Dia</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pessoas.map((pessoa) => (
          <TableRow key={pessoa.id}>
            <TableCell>{pessoa.primeiroNome}</TableCell>
            <TableCell>{pessoa.ultimoNome}</TableCell>
            <TableCell>{pessoa.nomeAtividade}</TableCell>
            <TableCell>{pessoa.turno}</TableCell>
            <TableCell>{pessoa.dia}</TableCell>
            <TableCell>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => openDialog(pessoa)}
                    className="bg-red-500 text-white"
                  >
                    Excluir
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza?</DialogTitle>
                    <DialogDescription>
                      Você realmente deseja excluir{" "}
                      <strong>{pessoa.primeiroNome} {pessoa.ultimoNome}</strong>? Essa ação não poderá ser desfeita.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      Sim, excluir
                    </Button>
                    <Button
                      variant="outline"
                      onClick={closeDialog} // Fecha o diálogo ao cancelar
                    >
                      Cancelar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </RadixTable>
  );
};

export default Table;
