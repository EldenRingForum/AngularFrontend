import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { ClassExternalAuthDto, ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { ClassIdentityDTO, IdentityDTO } from 'src/app/Models/DTO/AuthDTO/IdentityDTO';
import { User, ClassUser } from 'src/app/Models/user';
import { Category } from 'src/app/Models/category';
import { CategoryService } from 'src/app/Services/category.service';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { RoleCheckDTO } from 'src/app/Models/DTO/AuthDTO/RoleCheckDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Objects
  user: User
  newUser = new ClassUser
  users: User[]
  AuthDTO = new ClassExternalAuthDto
  public identityDTO = new ClassIdentityDTO
  password = new Subject<string>()
  categories: Category[]
  roleCheck = new RoleCheckDTO


  // Values
  loading: boolean
  rememberMe: boolean
  doesPasswordMatch: string
  errorMessage: string
  

  doesPasswordMatch$: Observable<string>
  private searchTerms$ = new Subject<string>();

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.roleCheck.loggedIn = false
    this.roleCheck.isAdmin = false

    this.doesPasswordMatch = ""
    this.CheckToken()
    this.CheckPassword()
    this.GetCategories()
  }

  GetCategories()
  {
    this.categoryService.GetCategories()
      .subscribe(s => this.categories = s)
  }


  //#region Check Password with ConfirmPassword
  // returnere den string som fejlen er 
  CreateStringObs(confirmPassword: string): Observable<string> {
    this.doesPasswordMatch$ = new Observable<string>(s => {
      if (this.identityDTO.password === undefined || this.identityDTO.password == "") {
        this.doesPasswordMatch = "password isnt typed"
        s.next("password isnt typed")
        return
      }

      if (this.identityDTO.password == confirmPassword) {
        s.next("")
        this.doesPasswordMatch = ""
      }
      else {
        s.next("Password and confirmpassword doesnt match")
        this.doesPasswordMatch = "Password and confirmpassword doesnt match"
      }

    })
    return this.doesPasswordMatch$
  }

  //funktionen der bliver kaldt for hver indtastet tegn, fra confirm password feltet.
  async Search(term: string) {
    await this.searchTerms$.next(term)
  }

  // laver en observable hvor dens resultat er baseret ud fra en anden observable
  CheckPassword() {
    this.doesPasswordMatch$ = this.searchTerms$.pipe(
      debounceTime(500),
      switchMap((term: string) => this.CreateStringObs(term))
    )
    this.doesPasswordMatch$.subscribe()
  }
  //#endregion

  CheckToken() {
    this.authService.CheckTokenValidity()
      .subscribe({
        next: ((res) => {
          this.roleCheck = res
        })
      })
  }

  RemoveToken() {
    this.authService.RemoveToken()
      .subscribe({
        next: ((res) => {
          this.roleCheck.loggedIn = res
          this.roleCheck.isAdmin = false
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
          this.roleCheck.loggedIn = true
          this.loading = false
          identityDTO = new ClassIdentityDTO
        }),
        error: ((err) => {
          console.log(err)
          this.loading = false
        })

      })
  }

  //TODO Der skal ogs?? laves en til MODERATOR, ADMIN, SYSADMIN
  //TODO SKAL HAVE USERNAMES MED
  RegisterUserWithIdentity(identityDTO: IdentityDTO) {
    console.log("You tried to register")
    this.authService.RegisterWithIdentity(identityDTO, this.rememberMe)
      .subscribe({
        next: ((res) => {
          this.newUser.userName = res.userName
          console.log("completed with res: ", res)
          this.roleCheck.loggedIn = true
          this.loading = false
        }),
        error: ((err) => {
          console.log(err)
          this.loading = false
        })
      })
  }
  //#endregion

  //#region Google
  /**
   * loading bliver brugt til at vise om venter p?? et server respons
   * authService.SigninWithGoogle bliver brugt at check om provider ID er korrekt
   * Hvis respons er succesfuld laves der et nyt kald til vores server for at registrere dem
   */
  LoginWithGoogle() {
    this.loading = true
    this.authService.SigninWithGoogle()
    .then(res => {
        const user: SocialUser = { ...res }
        this.AuthDTO.provider = user.provider
        this.AuthDTO.idToken = user.idToken
        this.ValidateExternalAuth(this.AuthDTO)
      }, error => console.log(error))
  }

  //her bliver kaldet til serveren gjort
  /**
   * @param externalAuthDTO
   * externalAuthDTO bliver fyldt af google, og username kommer fra et felt
   * Den laver kaldet til vores server, og logger provider.id og email.
   */
  private ValidateExternalAuth(externalAuthDTO: ExternalAuthDto) {
    this.authService.GetHttpsCookieFromGoogle(externalAuthDTO)
      .subscribe({
        next: ((res) => {
          this.newUser.userName = res.message
          this.roleCheck.loggedIn = true
          this.loading = false
        }),
        error: ((msg) => {
          console.log("error: ", msg)
          this.errorMessage = msg.error;
          this.loading = false
        })
      })
  }
  //#endregion

}
