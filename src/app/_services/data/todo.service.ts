import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../_shared/_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(username: string): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`http://localhost:8080/users/${username}/todos`);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.httpClient.delete<Todo>(`http://localhost:8080/users/todos/${id}`);
  }

  // updateTodo(username: string, id: string): Observable<TodoModel> {
  //   return this.httpClient.post<TodoModel>(`http://localhost:8080/users/${username}/todos/${id}`);
  // }

}
