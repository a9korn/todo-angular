import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public todoList: Todo[] = [];
  public title = '';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    console.log('INIT');
    this.httpClient.get<Todo[]>('http://127.0.0.1:3065/todos').subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  onCreate(): void {
    this.httpClient
      .post<Todo>('http://127.0.0.1:3065/todos', { title: this.title })
      .subscribe((todo) => {
        this.todoList.push(todo);
      });
    this.title = '';
  }

  onComplete(updateDto: Todo): void {
    updateDto.isCompleted = !updateDto.isCompleted;
    this.httpClient
      .patch<Todo>('http://127.0.0.1:3065/todos/' + updateDto.id, updateDto)
      .subscribe((todo) => {
        this.todoList = this.todoList.map((item) => (item.id !== todo.id ? item : todo));
      });
  }

  onRemove(todo: Todo): void {
    this.httpClient.delete<Todo>('http://127.0.0.1:3065/todos/' + todo.id).subscribe((todo) => {
      this.todoList = this.todoList.filter((item) => item.id !== todo.id);
    });
  }
}
