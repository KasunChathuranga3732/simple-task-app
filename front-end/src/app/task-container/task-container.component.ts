import { Component } from '@angular/core';
import {Task} from "../dto/task";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent {
  taskList: Array<Task> = [];

  saveTask(txt: HTMLInputElement) {

  }

  updateTask(task: Task) {

  }

  deleteTask(task: Task) {

  }
}
