import { useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../../contexts/CycleContext";


export function History () {
    const { cycles } = useContext(CyclesContext);
    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(
                                            new Date(cycle.startDate),{ 
                                                addSuffix: true,
                                                locale: ptBR
                                            }
                                        )}
                                    </td>
                                    <td>
                                        {cycle.finishDate && (
                                            <Status statusColor="green">Concluído</Status>
                                        )}
                                        {cycle.interruptDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}
                                        {!cycle.interruptDate && !cycle.finishDate && (
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                       })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}