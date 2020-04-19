import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Task } from '../modules/tasks/tasks.component';

const API_URL = "http://localhost:8084/api/";
// HTTP HEADER
const httpOptions = {
  headers: new HttpHeaders({'Content-type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserTasks(): Observable<any>{
    return this.httpClient.get(API_URL + 'tasks/');
  }

  addTask(content: string, date: Date): Observable<any>{
    return this.httpClient.post(API_URL + 'tasks/', {
      content: content,
      date: date
    }, httpOptions);
  }

  deleteTask(id: number): Observable<any>{
    return this.httpClient.delete(API_URL + 'tasks/' + id, httpOptions);
  }

  updateTask(task: Task){
    console.log("Task update:" + task)
    return this.httpClient.put(API_URL + 'tasks/', task, httpOptions);
  }
}
