import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SONGS_API, ALBUMS_API } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  songsData: any = [];
  albumsData: any = [];

  constructor(private http: HttpClient) { }

  getAllSongs() {
    // if (this.songsData.length) {
    //   return of(this.songsData)
    // } else {
      // return this.http.get(SONGS_API).subscribe(data => this.songsData = data);
    // }
    return this.http.get(SONGS_API);
  }

  getAllAlbums() {
    // if(this.albumsData) {
    //   return of(this.albumsData)
    // } else {
    //   return this.http.get(ALBUMS_API).subscribe(data => this.albumsData = data);
    // }
    return this.http.get(ALBUMS_API);
  }
}
