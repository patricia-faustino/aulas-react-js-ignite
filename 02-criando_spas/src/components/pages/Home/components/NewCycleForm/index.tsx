import { FormContainer, TaskInput, MinutesAumountInput } from "./styled";
import { useContext } from "react";
import { CyclesContext } from "../../../../../contexts/CycleContext";
import { useFormContext } from "react-hook-form";

export function NewCycleForm() {
    const { activeCycle }  = useContext(CyclesContext);
    // só funciona se houver um FormProvider no componente mãe
    const { register } = useFormContext(); 
 
    return (
        <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput 
                id="task" 
                placeholder="Dê seu nome para o seu projeto"
                list="task-sugestions"
                disabled={!!activeCycle}
                {...register('task')}
            />
            <datalist id="task-sugestions">
                <option value="Projeto 1">Projeto 1</option>
                <option value="Projeto 2">Projeto 2</option>
                <option value="Projeto 3">Projeto 3</option>
                <option value="Projeto 4">Projeto 4</option>
                <option value="Banana">Banana</option>
            </datalist>

            <label htmlFor="">durante</label>
            <MinutesAumountInput 
                type="number"
                id="minutesAmount" 
                placeholder="00"
                step={5}
                min={1}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', {valueAsNumber: true})}
            />

            <span>minutos.</span>
        </FormContainer>
    );
}