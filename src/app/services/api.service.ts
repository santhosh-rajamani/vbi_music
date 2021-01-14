import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, Observable, of } from 'rxjs';
import { SONGS_API, ALBUMS_API } from '../constants/app.constants';
import { albumDetailFromAPI, songDetailFromAPI } from '../models/songs.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  songsData: songDetailFromAPI[] = [];
  albumsData: albumDetailFromAPI[] = [];

  constructor(private http: HttpClient) { }

  getAllSongs() {
    if (this.songsData.length) {
      //  Use local cached copy to prevent repeated server calls
      return of(this.songsData, async);
    } else {
      const returnObservable = this.http.get(SONGS_API);
      returnObservable.subscribe(data => this.songsData = <songDetailFromAPI[]>data);
      return returnObservable;
    }
  }

  getAllAlbums() {
    if(this.albumsData.length) {
      //  Use local cached copy to prevent repeated server calls
      return of(this.albumsData, async);
    } else {
      const returnObservable = this.http.get(ALBUMS_API);
      returnObservable.subscribe(data => this.albumsData = <albumDetailFromAPI[]>data);
      return returnObservable;
    }
  }
}
