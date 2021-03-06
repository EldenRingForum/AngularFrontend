import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/Shared/admin.service';
import { Category } from 'src/app/Models/category';
import { PostWithCategoryDTO } from 'src/app/Models/DTO/PostWithCategory';
import { Comment } from 'src/app/Models/myComment';
import { Post } from 'src/app/Models/post';
import { CategoryService } from 'src/app/Services/category.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {

  categories: Category[]
  postWithCategory: PostWithCategoryDTO[]

  constructor(
    private categoryService: CategoryService, 
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.GetCategories()
    this.GetPosts()
  }

  GetCategories(){
    this.categoryService.GetCategories()
      .subscribe(res => this.categories = res)
  }

  GetPosts() {
    this.postService.GetTop10Posts()
      .subscribe(res => this.postWithCategory = res)  
  }

  
}