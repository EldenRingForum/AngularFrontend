import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { ClassComment, Comment } from 'src/app/Models/myComment';
import { ThreadService } from 'src/app/Services/thread.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { AdminService } from 'src/app/admin.service';
import { RoleCheckDTO } from 'src/app/Models/DTO/AuthDTO/RoleCheckDTO';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  specificPost: Post
  loading: boolean
  list: number
  roleCheck = new RoleCheckDTO()
  public comment = new ClassComment

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.roleCheck.loggedIn = false
    this.roleCheck.isAdmin = false
    this.authService.CheckTokenValidity()
      .subscribe(s => this.roleCheck = s)
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

  CheckToken() {
    this.authService.CheckTokenValidity()
      .subscribe({
        next: ((res) => {
          this.roleCheck = res
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
