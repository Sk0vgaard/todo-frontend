import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoModel } from '../../_shared/_models/todoModel';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(username: string): Observable<TodoModel[]> {
    return this.httpClient.get<TodoModel[]>(`http://localhost:8080/users/${username}/todos`);
  }

  deleteTodo(username: string, id: string): Observable<TodoModel> {
    return this.httpClient.delete<TodoModel>(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  // updateTodo(username: string, id: string): Observable<TodoModel> {
  //   return this.httpClient.post<TodoModel>(`http://localhost:8080/users/${username}/todos/${id}`);
  // }

}
