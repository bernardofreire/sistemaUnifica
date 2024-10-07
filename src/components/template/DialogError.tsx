import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface ErrorDialogProps {
    isOpen: boolean;
    onClose: () => void;
    errorMessage: string | null;
}

export default function ErrorDialog({ isOpen, onClose, errorMessage }: ErrorDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Erro de Login</DialogTitle>
                    <DialogDescription>
                        {"Ocorreu um erro inesperado. Tente novamente."}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={onClose}>Fechar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
