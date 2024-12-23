import { HandPalm, Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser no máximo 60 minutos"),
});
interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = new Date().getTime().toString();
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((prevCycles) => [...prevCycles, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }
  const task = watch("task");
  const isSubmitDisabled = !task;
  const onSubmit = handleSubmit(handleCreateNewCycle);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle?.minutesAmount * 60 : 0;
  const currentSeconds = totalSeconds - amountSecondsPassed;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if(secondsDifference >= totalSeconds){
          setCycles((prevCycles) => {
            return prevCycles.map((cycle) => {
              if (cycle.id === activeCycleId)
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
      
              return cycle;
            });
          });
      
          setAmountSecondsPassed(totalSeconds)
          
          clearInterval(interval);
          return;
        }
        setAmountSecondsPassed(secondsDifference)
      }, 1000);
      
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle,totalSeconds,activeCycleId]);

  useEffect(()=>{
    if(activeCycle)document.title = `${minutes}:${seconds}`;
  },[activeCycle,minutes,seconds])

  function handleInterruptCycle() {
    setCycles((prevCycles) => {
      return prevCycles.map((cycle) => {
        if (cycle.id === activeCycleId)
          return {
            ...cycle,
            interruptedDate: new Date(),
          };

        return cycle;
      });
    });

    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form action="" onSubmit={onSubmit}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
            disabled={!!activeCycle}
            list="task-sugestions"
            {...register("task")}
          />

          <datalist id="task-sugestions">
            <option value="Projeto 1">Projeto 1</option>
            <option value="Projeto 2">Projeto 2</option>
            <option value="Projeto 3">Projeto 3</option>
            <option value="Projeto 4">Projeto 4</option>
            <option value="Projeto 5">Projeto 5</option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            disabled={!!activeCycle}
            type="number"
            id="minutesAmount"
            step={5}
            min={1}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
