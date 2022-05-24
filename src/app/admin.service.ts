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

  private adminUrl = "api/admin"
  
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

  DeleteComment(id: number, comment: Comment): Observable<Comment> { 
    const url = `${this.adminUrl}/${id}`
    return this.http.put<Comment>(url, comment)
    .pipe(
      tap(res => console.log("Deleted Comment ", res))
    )
  }

  PinUnpinPost(id: Number, post: Post): Observable<Post>{
    const url = `${this.adminUrl}/${id}`
    return this.http.put<Post>(url, post)
    .pipe(
      tap(res => console.log("Pinned = ", res.stickied))
    )
  }

  WarnUser(id: number, user: User): Observable<User>{
    const url = `${this.adminUrl}/${id}`
    return this.http.put<User>(url, user)
    .pipe(
      tap(res => console.log("Warned User ", res))
    )
  }

  BanUser(id: number, user: User): Observable<User>{
    const url = `${this.adminUrl}/${id}`
    return this.http.put<User>(url, user)
    .pipe(
      tap(res => console.log("Banned User ", res))
    )
  }
}