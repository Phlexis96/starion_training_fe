import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Satellite {
  id?: number;
  name: string;
  type: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class SatelliteService {
  private apiUrl = "http://localhost:8080/api/satellites";

  constructor(private httpClient: HttpClient) { }

  getSatellites(): Observable<Satellite[]> {
    return this.httpClient.get<Satellite[]>(this.apiUrl);
  }

  addSatellite(satellite: Satellite): Observable<Satellite> {
    return this.httpClient.post<Satellite>(this.apiUrl, satellite);
  }

}