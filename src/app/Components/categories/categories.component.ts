import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { AdminService } from 'src/app/admin.service';
import { Category } from 'src/app/Models/category';
import { UnpinnedAndPinnedPostsDTO } from 'src/app/Models/DTO/UnpinnedAndPinnedPostsDTO';
import { ClassPost, Post } from 'src/app/Models/post';
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
    private adminService: AdminService,
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

  DeleteThread(post: Post){
    this.adminService.DeletePost(post)
    .subscribe({
      next: ((res) => {
        console.log(res);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  }

  WarnUser(id: number){
    this.adminService.WarnUser(id)
    .subscribe({
      next: ((res) => {
        console.log(res);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  }

  BanUser(id: number){
    this.adminService.BanUser(id)
    .subscribe({
      next: ((res) => {
        console.log(res);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  }

  PinUnpinThread(post: Post){
    this.adminService.PinUnpinThread(post)
    .subscribe({
      next: ((res) => {
        if (res) {
          this.posts.unpinnedPosts = this.posts.unpinnedPosts.filter(unpinnedPost => unpinnedPost !== post)
          this.posts.pinnedPosts.push(post)
        }
        else{
          this.posts.pinnedPosts = this.posts.pinnedPosts.filter(pinnedPosts => pinnedPosts !== post)
          this.posts.unpinnedPosts.push(post)
        }
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  }
}
