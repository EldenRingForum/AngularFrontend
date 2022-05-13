import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ClassExternalAuthDto, ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { ClassUser, User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  user: User
  newUser = new ClassUser
  users: User[]
  AuthDTO = new ClassExternalAuthDto

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.GetUsers()
  }



  GetUsers() {
    this.userService.GetUsers()
      .subscribe(res => this.users = res)
  }

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
