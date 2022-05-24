import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { ClassComment, Comment } from 'src/app/Models/myComment';
import { ThreadService } from 'src/app/Services/thread.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  specificPost: Post
  loading: boolean
  loggedIn: boolean = false
  list: number
  public comment = new ClassComment

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.authService.CheckTokenValidity()
      .subscribe(s => this.loggedIn = s)
    const id = +Number(this.route.snapshot.paramMap.get('id'));
    this.GetSpecificPost(id)
  }

  GetSpecificPost(id: number) {
    this.loading = true
    this.threadService.GetThread(id)
      .subscribe(res => {
        this.specificPost = res
        this.loading = false
        this.list = res.comments.length + 1
      })
  }

  PostComment(comment: Comment) {
    comment.postId = +Number(this.route.snapshot.paramMap.get('id'))
    this.threadService.PostComment(comment)
      .subscribe({
        next: ((res) => {
          console.log(res);
        }),
        error: ((err) => {
          console.log(err.message);
        })
      })
  }

  DeletePost(post: Post){
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
  
  DeleteComment(index: number, comment: Comment){
    this.adminService.DeleteComment(comment)
    .subscribe({
      next: ((res) => {
        this.specificPost.comments[index].text = res.text
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
}
