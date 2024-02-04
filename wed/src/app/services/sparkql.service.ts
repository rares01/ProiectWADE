import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.production';

@Injectable({
  providedIn: 'root'
})
export class SparkqlService {

  constructor(private http: HttpClient,) { }

  public getResources(query: string): any {
    const url = `${environment.apiPath}/sparql`;
    const body = {
      query: query,
    };

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Accept': 'text/csv'
      }),
      responseType: 'text'
    });
  }

  public getResourcesByFilter(query: string[]): any {
    const url = `${environment.apiPath}/sparql/filter`;
    
    return this.http.post(url, query, {
      headers: new HttpHeaders({
        'Accept': 'text/csv'
      }),
      responseType: 'text'
    });
  }
}
