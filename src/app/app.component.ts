import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './models/todo.model';
import { BACKEND_BASE_DOMAIN } from '../env';

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
    this.httpClient.get<Todo[]>(BACKEND_BASE_DOMAIN + '/todos').subscribe((todoList) => {
      this.todoList = todoList;
    });
  }

  onCreate(): void {
    this.httpClient
      .post<Todo>(BACKEND_BASE_DOMAIN + '/todos', { title: this.title })
      .subscribe((todo) => {
        this.todoList.push(todo);
      });
    this.title = '';
  }

  onComplete(updateDto: Todo): void {
    updateDto.isCompleted = !updateDto.isCompleted;
    this.httpClient
      .patch<Todo>(BACKEND_BASE_DOMAIN + '/todos/' + updateDto.id, updateDto)
      .subscribe((todo) => {
        this.todoList = this.todoList.map((item) => (item.id !== todo.id ? item : todo));
      });
  }

  onRemove(todo: Todo): void {
    this.httpClient.delete<Todo>(BACKEND_BASE_DOMAIN + '/todos/' + todo.id).subscribe((todo) => {
      this.todoList = this.todoList.filter((item) => item.id !== todo.id);
    });
  }
}
