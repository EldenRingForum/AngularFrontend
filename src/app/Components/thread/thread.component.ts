import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/Models/post';
import { ClassComment, Comment } from 'src/app/Models/myComment';
import { ThreadService } from 'src/app/Services/thread.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  specificPost: Post
  loading: boolean
  isLoggedIn: boolean = false
  list: number
  public comment = new ClassComment

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.CheckTokenValidity()
      .subscribe(s => this.isLoggedIn = s)
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
    this.ngOnInit()
  }
}
