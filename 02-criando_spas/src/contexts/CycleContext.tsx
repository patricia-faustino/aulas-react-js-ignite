import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

interface CreateCycleData {
    task: string
    minutesAmount: number
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({
    children
}: CyclesContextProviderProps) {
    const [cycleState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    }, (initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-time:cycles-state-1.0.0');

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON);
        }
        return initialState;
    });
    const { cycles, activeCycleId } = cycleState;
    const activeCycle = cycles
        .find(cycle => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() =>{
        if(activeCycle) {
            return differenceInSeconds(
                new Date(),
                new Date(activeCycle.startDate)
            );
        }

        return 0;
    });

    useEffect(() => {
        const stateJson = JSON.stringify(cycleState);

        localStorage.setItem('@ignite-time:cycles-state-1.0.0', stateJson);
    }, [cycles])
    
    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }
    
    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())
        const newCycle : Cycle ={
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider
            value={{
            cycles,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle,
        }}
      >
        {children}
      </CyclesContext.Provider>
        
    );
}