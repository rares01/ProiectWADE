import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { JwtUtil } from '../util/jwt.util';
import { DecodedToken } from '../models/decoded-token.model';
import { JwtToken } from '../models/jwt-token.model';
import { RegisterUser } from '../models/register-user.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtDecode = JwtUtil.decodeToken;
  private decodedToken: DecodedToken | null;
  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  public get token(): DecodedToken | null {
    if (!this.decodedToken) {
      this.decodeToken(this.jwtToken);
    }
    return this.decodedToken;
  }

  public get userRole(): string | undefined {
    return this.checkIfTokenExists() ? this.token?.role : undefined;
  }

  public get jwtToken(): string {
    return localStorage.getItem('JWT_TOKEN') as string;
  }

  public get isLoggedIn(): boolean {
    return this.checkIfTokenExists();
  }

  public register(
    registeruser: RegisterUser
  ): Observable<RegisterUser> {

    const url = `${environment.apiPath}/authenticate/login`;
    return this.http.post<RegisterUser>(
      url, registeruser, { headers: this.httpHeaders }
    );
  }

  public login(
    username: string,
    password: string,
  ): Observable<void> {
    const body = JSON.stringify({
      username: username,
      password: password,
    });

    const url = `${environment.apiPath}/authenticate/login`;

    return this.http.post(url, body, { headers: this.httpHeaders }
    ).pipe(
      map((data) => {
        const result = data as JwtToken;
        this.setSession(result.token);
      })
    );
  }

  public logout(): void {
    this.decodeAndRemoveJwt();
  }

  private decodeToken(token: string): void {
    this.decodedToken = this.jwtDecode(token) as DecodedToken;
  }

  private decodeAndRemoveJwt(): void {
    this.decodedToken = null;
    localStorage.removeItem('JWT_TOKEN');
  }

  private setSession(authResult: string): void {
    this.decodeToken(authResult);

    if (!this.decodedToken) {
      return;
    }
    localStorage.setItem('JWT_TOKEN', authResult);
  }

  private checkIfTokenExists(): boolean {
    const token = localStorage.getItem('JWT_TOKEN');
    if (!token) {
      return false;
    }

    return true;
  }
}
