import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Category } from 'src/app/Models/category';
import { UnpinnedAndPinnedPostsDTO } from 'src/app/Models/DTO/UnpinnedAndPinnedPostsDTO';
import { ClassPost } from 'src/app/Models/post';
import { CategoryService } from 'src/app/Services/category.service';
import { PostService } from 'src/app/Services/post.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  posts: UnpinnedAndPinnedPostsDTO
  thread = new ClassPost
  loggedIn: boolean = false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.authService.CheckTokenValidity()
      .subscribe(s => this.loggedIn = s)
    this.GetUnpinnedPosts(id)
  }

  GetUnpinnedPosts(id: number) {
    this.postService.GetPostsFromCategory(id)
      .subscribe(res => {
        this.posts = res
      })
  }

  PostThread(thread: ClassPost) {
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    thread.categoryId = id
    this.postService.PostThread(thread)
      .subscribe(s => {
        console.log(s.user.userName);
        
        s.commentAmount = 0
        this.posts.unpinnedPosts.push(s)
      })
  }
}
