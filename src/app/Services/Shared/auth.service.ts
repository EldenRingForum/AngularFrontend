import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthResponseDTO } from 'src/app/Models/DTO/AuthDTO/AuthResponseDTO';
import { ExternalAuthDto } from 'src/app/Models/DTO/AuthDTO/ExternalAuthDTO';
import { IdentityDTO, ClassIdentityDTO } from "src/app/Models/DTO/AuthDTO/IdentityDTO";
import { RoleCheckDTO } from 'src/app/Models/DTO/AuthDTO/RoleCheckDTO';
import { UpdatePasswordDTO } from "src/app/Models/DTO/AuthDTO/UpdatePasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private identityUrl = "api/Identity"
  private googleUrl = "api/Google"
  private tokenUrl = "api/Token"

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  //#region Token
  public CheckTokenValidity(): Observable<RoleCheckDTO> {
    const url = `${this.tokenUrl}/checktoken`
    console.log("trying to check token")
    return this.http.get<RoleCheckDTO>(url)
      .pipe(
        tap(res => console.log("http response", res))
      )
  }

  public RemoveToken(): Observable<boolean> {
    const url = `${this.tokenUrl}/removetoken`
    return this.http.get<boolean>(url)

  }
  //#endregion

  //#region Identity Auth
  SignInWithIdentity(email: string, password: string): Observable<IdentityDTO> {
    const url = `${this.identityUrl}/login`
    let IdentityDTO = new ClassIdentityDTO();
    IdentityDTO.email = email
    IdentityDTO.password = password
    //TODO IdentityDTO.rememberMe skal være en toggle på html
    IdentityDTO.rememberMe = true
    return this.http.post<IdentityDTO>(url, IdentityDTO)
      .pipe(
        tap(res => console.log("http response", res))
      )
  }


  RegisterWithIdentity(identity: IdentityDTO, rememberMe: boolean): Observable<IdentityDTO> {
    const url = `${this.identityUrl}/registeruser`
    identity.rememberMe = rememberMe
    return this.http.post<IdentityDTO>(url, identity)
      .pipe(
        tap(res => console.log("http response", res))
      )
  }

  UpdatePassword(passwords: UpdatePasswordDTO): Observable<boolean> {
    const url = `${this.identityUrl}/UpdatePassword`
    return this.http.put<boolean>(url, passwords)
      .pipe(
        tap(res => console.log("You tried to login = ", res))
      )
  }
  //#endregion


  //#region Google Auth
  SigninWithGoogle = () => {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  public GetHttpsCookieFromGoogle = (body: ExternalAuthDto) => {
    const url = `${this.googleUrl}/Login`
    console.log("Idtoken :", body.idToken, body.provider)
    return this.http.post<AuthResponseDTO>(url, body);
  }
  //#endregion
}
