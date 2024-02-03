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
    ) { }

  public savePreferences(
    preferencesList: string[]
  ): Observable<string[]> {

    const url = `${environment.apiPath}/user/preferences`;
    return this.http.post<string[]>(
      url, preferencesList, { headers: this.httpHeaders }
    );
  }

  public firstLogin(
  ): Observable<boolean> {
    const url = `${environment.apiPath}/user/firstLogin`;
    return this.http.get<boolean>(
      url, { headers: this.httpHeaders }
    );
  }
  
}
