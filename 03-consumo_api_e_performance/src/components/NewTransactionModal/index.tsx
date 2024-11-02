import * as Dialog from "@radix-ui/react-dialog";
import { Close, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

export function NewTransactionModal(){
    return (
        <Dialog.Portal>
            {/* o portal adiciona o conteudo a parte da aplicação, ou seja, fora do componente que o chamou */}
            <Overlay />
            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <Close> 
                    <X size={24}/>
                </Close>  

                <form action="">
                    <input type="text" placeholder="Descrição" required/>
                    <input type="number" placeholder="Preço" required/>
                    <input type="text" placeholder="Categoria" required/>
                        <TransactionType>
                            <TransactionTypeButton value="income" variant="income">
                                <ArrowCircleUp size={24}/>
                                Entrada
                            </TransactionTypeButton>
                            <TransactionTypeButton value="outcome" variant="outcome">
                                <ArrowCircleDown size={24}/>
                                Saída
                            </TransactionTypeButton>
                        </TransactionType>
                    <button type="submit">Cadastrar</button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}