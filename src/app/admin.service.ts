import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Post } from './Models/post';
import { User } from './Models/user';
import { Comment } from './Models/myComment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private adminUrl = "api/Admin"
  
  constructor(
    private http: HttpClient
  ) { }


  DeletePost(post: Post): Observable<Post>{
    const url = `${this.adminUrl}/DeletePost`
    return this.http.put<Post>(url, post)
    .pipe(
      tap(res => console.log("Deleted Post ", res.id))
    )
  }

  DeleteComment(comment: Comment): Observable<Comment> { 
    const url = `${this.adminUrl}/DeleteComment`
    return this.http.put<Comment>(url, comment)
    .pipe(
      tap(res => console.log("Deleted Comment ", res))
    )
  }

  PinUnpinThread(post: Post): Observable<boolean>{
    const url = `${this.adminUrl}/PinUnpin`
    return this.http.put<boolean>(url, post)
    .pipe(
      tap(res => console.log("Pinned = ", res))
    )
  }

  WarnUser(id: number): Observable<User>{
    const url = `${this.adminUrl}/${id}`
    return this.http.put<User>(url, "user")
    .pipe(
      tap(res => console.log("Warned User ", res))
    )
  }

  BanUser(id: number): Observable<User>{
    const url = `${this.adminUrl}/BanUser/${id}`
    return this.http.put<User>(url, "user")
    .pipe(
      tap(res => console.log("Banned User ", res))
    )
  }
}