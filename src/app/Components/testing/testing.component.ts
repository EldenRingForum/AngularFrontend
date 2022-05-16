import { SocialUser } from '@abacritt/angularx-social-login';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, observable, Observable, Subject, switchMap, fromEvent } from 'rxjs';
import { ClassExternalAuthDto, ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { IdentityDTO, ClassIdentityDTO } from "src/app/Models/DTO/AuthDTO/IdentityDTO";
import { ClassUser, User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/Shared/auth.service';
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
  AuthDTO = new ClassExternalAuthDto
  public identityDTO = new ClassIdentityDTO
  test: Observable<string>
  password = new Subject<string>()

  // Values
  loading: boolean
  isLoggedIn: boolean
  rememberMe: boolean
  doesPasswordMatch: string

  doesPasswordMatch$: Observable<string>

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.doesPasswordMatch = ""
    this.CheckToken()
    this.GetUsers()
  }

  GetUsers() {
    this.userService.GetUsers()
      .subscribe(res => this.users = res)
  }


  CheckPassword() {
    this.doesPasswordMatch$ = new Observable<string>(s => {
      s.next("dwad")

      if (this.identityDTO.password === undefined || this.identityDTO.password == "") {
        s.next("password isnt typed")
        return
      }

      if (this.identityDTO.password == this.identityDTO.confirmPassword) {
        s.next("")
      }
      else {
        s.next("Password and confirmpassword doesnt match")
      }
    })
    this.doesPasswordMatch$
      .pipe(
        debounceTime(2000)
      )
      .subscribe(s => {
        this.doesPasswordMatch = s
        console.log(this.doesPasswordMatch);
      })
  }

  CheckToken() {
    this.authService.CheckTokenValidity()
      .subscribe({
        next: ((res) => {
          this.isLoggedIn = res
        })
      })
  }

  RemoveToken() {
    this.authService.RemoveToken()
      .subscribe({
        next: ((res) => {
          this.isLoggedIn = res
        })
      })
  }

  //#region Identity
  LoginWithIdentity(identityDTO: IdentityDTO) {
    console.log("You tried to login ")
    this.loading = true;
    this.authService.SignInWithIdentity(identityDTO.email, identityDTO.password)
      .subscribe({
        next: ((res) => {
          this.newUser.userName = res.userName
          console.log("completed with res: ", res)
          this.isLoggedIn = true
          this.loading = false
        }),
        error: ((err) => {
          console.log(err)
          this.loading = false
        })

      })
  }

  //TODO Der skal også laves en til MODERATOR, ADMIN, SYSADMIN
  //TODO SKAL HAVE USERNAMES MED
  RegisterUserWithIdentity(identityDTO: IdentityDTO) {
    console.log("You tried to register")
    this.authService.RegisterWithIdentity(identityDTO.email, identityDTO.password, identityDTO.confirmPassword, this.rememberMe)
      .subscribe({
        next: ((res) => {
          this.user.userName = res.userName
          console.log("completed with res: ", res)
          this.isLoggedIn = true
          this.loading = false
        }),
        error: ((err) => {
          console.log(err)
          this.loading = false
        })
      })
  }


  //! obsolete maybe
  DoesPasswordMatch(): boolean {
    console.log(this.identityDTO.rememberMe);
    console.log(this.identityDTO.password);
    console.log(this.identityDTO.confirmPassword);

    if (this.identityDTO.password === undefined || this.identityDTO.password == "") {
      this.doesPasswordMatch = "password isnt typed"
      return false
    }

    if (this.identityDTO.password == this.identityDTO.confirmPassword) {
      this.doesPasswordMatch = ""
      return true
    }
    else {
      this.doesPasswordMatch = "Password and confirmpassword doesnt match "
      return false
    }
  }

  //#endregion

  //#region Google
  LoginWithGoogle() {
    this.authService.SigninWithGoogle()
      .then(res => {
        const user: SocialUser = { ...res }
        this.AuthDTO.provider = user.provider
        this.AuthDTO.idToken = user.idToken
        this.ValidateExternalAuth(this.AuthDTO)
      }, error => console.log(error))
  }

  private ValidateExternalAuth(externalAuthDTO: ExternalAuthDto) {
    this.authService.GetHttpsCookieFromGoogle(externalAuthDTO)
      .subscribe({
        next: ((res) => {
          this.newUser.userName = res.message
        }),
        error: ((msg) => console.log("error: ", msg))
      })
  }
  //#endregion
}
