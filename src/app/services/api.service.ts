import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import {throwError} from 'rxjs'
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user: any = false
  constructor(
    private http: HttpClient
  ) { }
  
  

  // get method
  public get(path: string) {
    const endpoint = API_URL + path;
    return this.http.get(endpoint).pipe(
        timeout(30000),
        catchError(e => {
          return throwError(() => new Error(e));
        })
      )
    }
  // create method
  public post(path: string, body: any) {
    const endpoint = API_URL + path;
    return this.http.post(endpoint, body).pipe(
      timeout(15000),
      catchError(e => {
        return throwError(() => new Error(e));
      })
    )
  }
  // delete method
  public delete(path: string){
    const endpoint = API_URL + path;
    return this.http.delete(endpoint).pipe(
      timeout(15000),
      catchError(e => {
        return throwError(() => new Error(e));
      })
    )
  }
  // update method
  public update(path: string, body: any) {
    const endpoint = API_URL + path;
    return this.http.put(endpoint, body).pipe(
      timeout(15000),
      catchError(e => {
        return throwError(() => new Error(e));
      })
    )
  }
}
