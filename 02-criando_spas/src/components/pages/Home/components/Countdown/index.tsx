import { CountdownContainer, Separator } from "./styled";
import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "../../../../../contexts/CycleContext";

export function Countdown() {
    const { 
        activeCycle,
        activeCycleId, 
        amountSecondsPassed,  
        markCurrentCycleAsFinished, 
        setSecondsPassed 
    } = useContext(CyclesContext)
    const totalSeconds = activeCycle 
        ? activeCycle.minutesAmount * 60 
        : 0;
    const currentSeconds = activeCycle 
        ? totalSeconds - amountSecondsPassed 
        : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds])


    useEffect(() => {
        let interval: number;
        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifferenceActive = differenceInSeconds(
                    new Date(),
                    new Date(activeCycle.startDate)
                );
                
                if(secondsDifferenceActive >= totalSeconds) {
                    clearInterval(interval);
                    markCurrentCycleAsFinished();
                    setSecondsPassed(0);
                } else {
                    setSecondsPassed(secondsDifferenceActive);
                }
            }, 1000)
        }
        return () => {
            clearInterval(interval);
        }
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    return (
        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>
    )
}
