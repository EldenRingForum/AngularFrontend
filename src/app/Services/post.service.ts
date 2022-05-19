import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PostWithCategoryDTO } from '../Models/DTO/PostWithCategory';
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
}
