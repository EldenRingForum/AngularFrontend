import { Component, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { ClassUpdatePasswordDTO, UpdatePasswordDTO } from 'src/app/Models/DTO/AuthDTO/UpdatePasswordDTO';
import { ClassUser, User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/Shared/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  errorMessage: string
  image: any
  user: User
  file: Blob
  newUser = new ClassUser()
  UpdatePasswordDTO = new ClassUpdatePasswordDTO()
  doesPasswordMatch: string
  
  doesPasswordMatch$: Observable<string>
  private searchTerms$ = new Subject<string>();


  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.newUser = new ClassUser()
    this.GetUser()
    this.CheckPassword()
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
          this.UpdatePasswordDTO.oldPassword = ""
          this.UpdatePasswordDTO.newPassword = ""
          this.UpdatePasswordDTO.confirmNewPassword = ""
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

  CreateStringObs(confirmPassword: string): Observable<string> {
    this.doesPasswordMatch$ = new Observable<string>(s => {
      if (this.UpdatePasswordDTO.newPassword === undefined || this.UpdatePasswordDTO.confirmNewPassword == "") {
        this.doesPasswordMatch = "password isnt typed"
        s.next("password isnt typed")
        return
      }

      if (this.UpdatePasswordDTO.newPassword == confirmPassword) {
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

  async Search(term: string) {
    await this.searchTerms$.next(term)
  }

  CheckPassword() {
    this.doesPasswordMatch$ = this.searchTerms$.pipe(
      debounceTime(500),
      switchMap((term: string) => this.CreateStringObs(term))
    )
    this.doesPasswordMatch$.subscribe()
  }
  //#endregion
}
