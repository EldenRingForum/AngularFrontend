import { SocialUser } from '@abacritt/angularx-social-login';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, observable, Observable, Subject, switchMap, fromEvent, retry } from 'rxjs';
import { Category } from 'src/app/Models/category';
import { ClassExternalAuthDto, ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { IdentityDTO, ClassIdentityDTO } from "src/app/Models/DTO/AuthDTO/IdentityDTO";
import { Post } from 'src/app/Models/post';
import { ClassUser, User } from 'src/app/Models/user';
import { CategoryService } from 'src/app/Services/category.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { ThreadService } from 'src/app/Services/thread.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  // Objects
  user: User
  newUser = new ClassUser
  users: User[]
  specificPost: Post
  categories: Category[]
  // Values
  loading: boolean

  doesPasswordMatch$: Observable<string>
  private searchTerms$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private threadService: ThreadService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.GetCategories()
  }

  GetUsers() {
    this.userService.GetUsers()
      .subscribe(res => this.users = res)
  }

  GetCategories(){
    this.categoryService.GetCategories()
      .subscribe(res => this.categories = res)
  }

  GetSpecificPost() {
    this.threadService.GetThread(2)
      .subscribe(res => {
        this.specificPost = res
      })
  }
}
