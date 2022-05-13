import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDTO } from 'src/app/Models/DTO/AuthDTO/AuthResponseDTO';
import { ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private identityURL = ""
  private googleURL = "api/Google"
  private tokenURL = ""

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  //#region Identity Auth
  

  //#endregion


  //#region Google Auth
  SigninWithGoogle = () => {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  public GetHttpsCookieFromGoogle = (body: ExternalAuthDto) => {
    const url = `${this.googleURL}/Login`
    console.log("Idtoken :", body.idToken, body.provider)
    return this.http.post<AuthResponseDTO>(url, body);
  }
  //#endregion
}
