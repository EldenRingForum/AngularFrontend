import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Category } from '../Models/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private CategoryUrl = "api/categories"

  constructor(
    private http: HttpClient
  ) { }


  public GetCategories(): Observable<Category[]> {
    const url = `${this.CategoryUrl}`
    return this.http.get<Category[]>(url)
      .pipe(
        tap(res => console.log("http res: ", res))
      )
  }
}
