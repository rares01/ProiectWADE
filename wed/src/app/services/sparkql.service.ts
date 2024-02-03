import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SparkqlService {
  private httpHeaders = new HttpHeaders().set('Content-Type', 'text/csv');

  constructor(private http: HttpClient,) { }

  public getResources() {
    const url = `${environment.apiPath}/sparql`;
    return this.http.get<boolean>(
      url, { headers: this.httpHeaders }
    );
  }
}
