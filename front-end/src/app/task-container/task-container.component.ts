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
    if(!txt.value.trim()) {
      txt.select();
      return;
    }

    this.http.post<Task>('http://localhost:8080/app/api/v1/tasks',
      new Task(0, txt.value, "NOT_COMPLETED"))
      .subscribe(task=>{
        this.taskList.push(task);
        txt.value = "";
        txt.focus();
      });
  }

  updateTask(task: Task) {
    this.http.patch<Task>(`http://localhost:8080/app/api/v1/tasks/${task.id}`,
      new Task(task.id, task.description,
        (task.status === 'COMPLETED')? 'NOT_COMPLETED':'COMPLETED'))
      .subscribe(()=>{
        const index = this.taskList.indexOf(task);
        this.taskList.splice(index, 1, task);
      });
  }

  deleteTask(task: Task) {
    this.http.delete(`http://localhost:8080/app/api/v1/tasks/${task.id}`)
      .subscribe(data=>{
        const index = this.taskList.indexOf(task);
        this.taskList.splice(index, 1);
      });
  }
}
