import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostWithCategoryDTO } from '../Models/DTO/PostWithCategory';
import { UnpinnedAndPinnedPostsDTO } from '../Models/DTO/UnpinnedAndPinnedPostsDTO';
import { Post } from '../Models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postUrl = "api/Posts"

  constructor(
    private http: HttpClient
  ) { }

  GetTop10Posts(): Observable<PostWithCategoryDTO[]> {
    const url = `${this.postUrl}/GetRecentPosts`
    return this.http.get<PostWithCategoryDTO[]>(url)
      .pipe(
        tap(res => console.log("PostWithCat res: ", res))
      )
  }

  //id is categoryid
  GetPostsFromCategory(id: number): Observable<UnpinnedAndPinnedPostsDTO> {
    const url = `${this.postUrl}/GetCategoryPosts/${id}`
    return this.http.get<UnpinnedAndPinnedPostsDTO>(url)
      .pipe(
        tap(res => console.log("Post res: ", res))
      )
  }

  PostThread(thread: Post): Observable<Post> {
    const url = `${this.postUrl}`
    return this.http.post<Post>(url, thread)
      .pipe(
        tap(res => console.log("Posted Thread ", res))
      )
  }
}
