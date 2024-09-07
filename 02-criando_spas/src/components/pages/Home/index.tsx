import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer } from "./styled";
import { useContext } from "react";
import { Countdown } from "./components/Countdown";
import { StopCountdownButton, StartCountdownButton } from "./styled";
import { NewCycleForm } from "./components/NewCycleForm";
import  { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../../contexts/CycleContext";


const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos.')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;


export function Home () {
    const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 1
        }
    });   
    const { handleSubmit, watch, reset } = newCycleForm;

    const task = watch('task');
    const isSubmitedDisabled = !task;4

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    return (
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                
                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ): (
                    <StartCountdownButton disabled={isSubmitedDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}