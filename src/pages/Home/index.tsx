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
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod.number().min(5,'O ciclo precisa ser no mínimo 5 minutos').max(60,'O ciclo precisa ser no máximo 60 minutos')
})
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function Home() {
  const {register, handleSubmit,watch,formState:{errors}} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
      task: '',
      minutesAmount: 0
    }
  })
  

  function handleCreateNewCycle(data:NewCycleFormData) {
  }
  const task = watch('task')
  const isSubmitDisabled = !task
  const onSubmit = handleSubmit(handleCreateNewCycle)

  return (
    <HomeContainer>
      <form action="" onSubmit={onSubmit}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
            list="task-sugestions"
            {...register('task')}
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
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount',{valueAsNumber: true})}
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
        <StartCountdownButton disabled={isSubmitDisabled}>
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
