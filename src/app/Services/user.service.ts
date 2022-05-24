import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, tap } from 'rxjs';
import { User } from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private UserUrl = "api/users"

  constructor(
    private http: HttpClient,
  ) { }

  public GetUsers(): Observable<User[]>{
    const url = `${this.UserUrl}`
    console.log("Getting users")
    return this.http.get<User[]>(url)
      .pipe(
        tap(res => console.log("http res: ", res))
      )
  }

  public GetLoginName(): Observable<User>{
    const url = `${this.UserUrl}/1`
    console.log("Getting users")
    return this.http.get<User>(url)
      .pipe(
        tap(res => console.log("http res: ", res))
      )
  }

  public UpdatePFP(user: User): Observable<User>{
    const url = `${this.UserUrl}/UpdateImage`
    console.log("Updating PFP")
    return this.http.put<User>(url, user)
      .pipe(
        tap(res => console.log("http res: ", res))
      )
  }
}
