import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm() {
  const {activeCycle} = useContext(CyclesContext)
  const { register } = useFormContext();
  
  return (
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
        min={0}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />

      <span>minutos</span>
    </FormContainer>
  );
}
