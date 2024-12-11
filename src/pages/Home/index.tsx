import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
            list="task-sugestions"
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
            placeholder="00:00"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountdownButton>
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
