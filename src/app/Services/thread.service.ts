import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ClassComment, Comment } from 'src/app/Models/myComment';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  private PostUrl = "api/posts"
  private CommentUrl = "api/comments"

  constructor(
    private http: HttpClient

  ) { }

  public GetThread(id: number): Observable<Post>{
    const url = `${this.PostUrl}/${id}`
    console.log("Getting Thread")
    return this.http.get<Post>(url)
      .pipe(
        tap(res => console.log("http res: ", res))
      )
  }

  public PostComment(comment: Comment): Observable<Comment>{
    const url = `${this.CommentUrl}`
    return this.http.post<Comment>(url, comment)
      .pipe(
        tap(res => console.log("http res: ", res)
        )
      )
  }
  
}
