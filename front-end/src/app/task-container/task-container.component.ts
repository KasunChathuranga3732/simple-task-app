import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../dto/task";

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent {
  taskList: Array<Task> = [];

  constructor(private http: HttpClient) {
    http.get<Array<Task>>('http://localhost:8080/app/api/v1/tasks')
      .subscribe(taskList=> this.taskList = taskList);
  }

  saveTask(txt: HTMLInputElement) {

  }

  updateTask(task: Task) {

  }

  deleteTask(task: Task) {

  }
}
