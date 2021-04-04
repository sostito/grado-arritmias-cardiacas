// 1 - Importaciones
import { Action } from '@ngrx/store'
import { Task } from '../app/interfaces/TaskModel'

// 2 - Definición del tipo de acción
export const ADD_TASK = 'Add task'
export const CLEAN_TASK = 'Clean task'

// 3 - Creación de la clase tipo AddTask
export class AddTask implements Action {
  readonly type = ADD_TASK
  constructor(public payload: Task) { }
}

export class CleanTask implements Action {
  readonly type = CLEAN_TASK
  constructor(public payload: Task) { }
}

// 4 - Exportación de la acción
export type Actions = AddTask | CleanTask
