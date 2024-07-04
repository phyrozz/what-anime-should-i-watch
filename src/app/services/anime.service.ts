import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  getRecommendations(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime/${id}/recommendations`);
  }

  getAnime(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime/${id}`);
  }

  searchAnime(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime?q=${query}`);
  }

  getAnimeGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genres/anime`);
  }
}
