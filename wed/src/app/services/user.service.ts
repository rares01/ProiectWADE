import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable, map } from 'rxjs';
import { JwtToken } from '../models/jwt-token.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient,
    private authService: AuthService,
    ) { }

  public savePreferences(
    preferencesList: string[]
  ): Observable<void> {

    const url = `${environment.apiPath}/user/preferences`;
    return this.http.post(
      url, preferencesList, { headers: this.httpHeaders }
    ).pipe(
      map((data) => {
        const result = data as JwtToken;
        this.authService.setSession(result.token);
      })
    );;
  }
  
}
