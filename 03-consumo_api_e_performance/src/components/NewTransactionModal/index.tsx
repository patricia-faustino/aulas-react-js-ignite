import * as Dialog from "@radix-ui/react-dialog";
import {  CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z  from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../context/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionsFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionsFormSchema>;

export function NewTransactionModal() {
    const createTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createTransaction;
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionsFormSchema),
        defaultValues: {
            type: 'income',
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const { description, price, category, type } = data;

        await createTransaction({
          description,
          price,
          category,
          type,
        });

        reset();
    }

    return (
        <Dialog.Portal>
            {/* o portal adiciona o conteudo a parte da aplicação, ou seja, fora do componente que o chamou */}
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>

                <CloseButton > 
                    <X size={24}/>
                </CloseButton >  

                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text" 
                        placeholder="Descrição" 
                        required
                        {...register('description')}
                    />
                    <input
                        type="number" 
                        placeholder="Preço" 
                        required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text" 
                        placeholder="Categoria" 
                        required
                        {...register('category')}
                    />
                    <Controller
                        control={control}
                        name="type"
                        render={({ field}) => {
                            console.log(field.value);
                            return (
                                <TransactionType
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <TransactionTypeButton value="income" variant="income">
                                        <ArrowCircleUp size={24}/>
                                        Entrada
                                    </TransactionTypeButton>
                                    <TransactionTypeButton value="outcome" variant="outcome">
                                        <ArrowCircleDown size={24}/>
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}
                    />

                        
                    <button  
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}