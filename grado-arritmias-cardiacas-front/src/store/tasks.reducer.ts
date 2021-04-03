// 1 - Importaciones
import { Task } from '../app/interfaces/TaskModel'
import * as TaskActions from './tasks.actions'

// 2 - Estado inicial
const initialState: Task = {
  name: 'First Task',
  state: '[]'
}

// 3 - Switch con las funciones puras
export function taskReducer(state: Task[] = [initialState], action: TaskActions.Actions) {
  switch (action.type) {
    case TaskActions.ADD_TASK:
      return [...state, action.payload];
    case TaskActions.CLEAN_TASK:
      state = undefined;
    default:
      return state;
  }
}
