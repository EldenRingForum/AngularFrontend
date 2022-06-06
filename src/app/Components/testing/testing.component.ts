import { SocialUser } from '@abacritt/angularx-social-login';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, map, observable, Observable, Subject, switchMap, fromEvent, retry } from 'rxjs';
import { Category } from 'src/app/Models/category';
import { ClassExternalAuthDto, ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { IdentityDTO, ClassIdentityDTO } from "src/app/Models/DTO/AuthDTO/IdentityDTO";
import { ClassUpdatePasswordDTO, UpdatePasswordDTO } from 'src/app/Models/DTO/AuthDTO/UpdatePasswordDTO';
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
  newUser = new ClassUser()
  file: Blob
  image: any

  UpdatePasswordDTO = new ClassUpdatePasswordDTO()
  errorMessage: string

  // Values
  loading: boolean

  doesPasswordMatch$: Observable<string>
  private searchTerms$ = new Subject<string>();

  constructor(
    private userService: UserService,
    private sant: DomSanitizer,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.newUser = new ClassUser()
    this.GetUser()
  }

  GetUser() {
    this.userService.GetUserName()
      .subscribe(s => {
        this.user = s
      })
  }

  UpdatePassword(passwords: UpdatePasswordDTO) {
    this.authService.UpdatePassword(passwords)
      .subscribe(s => {
        if (s) {
          this.errorMessage = "Password Changed"
        }
        else {
          this.errorMessage = "Password NOT Changed"
        }
      })
  }

  SelectAndConvertFile(event: Event) {
    this.ConvertFileToBase64(event)
  }

  SubmitPicture(user: ClassUser) {
    user.profilePicture = this.image
    this.userService.UpdatePFP(user)
      .subscribe(s => {
        this.user.profilePicture = s.profilePicture
      })
  }

  ConvertFileToBase64(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    let files: FileList | null = element.files as FileList
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file as Blob)
    reader.onloadend = () => {
      console.log("dwada ", reader.result as string)
      this.image = reader.result as string
    }
  }
}
