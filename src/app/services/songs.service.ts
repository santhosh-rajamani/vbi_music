import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { albumDetailFromAPI, song, songDetailFromAPI } from '../models/songs.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  
  searchForSongs(searchKey: string) {

    //Search for names
    let filteredSongs = [
      ...this.songs.filter((song) => song.name.includes(searchKey)),
      ...this.songs.filter((song) => song.albumName.includes(searchKey))
    ];

    // Remove duplicates and set to source
    this.songs = filteredSongs.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)

    return of(this.songs);
  }

  songs: song[] = [];

  constructor(private apiService: ApiService) { }

  getAllSongs(): Observable<song[]> {

    let subject = new Subject<song[]>();
    let songsList = this.apiService.getAllSongs();
    let albumsList = this.apiService.getAllAlbums();

    forkJoin([songsList, albumsList]).subscribe((results: [songDetailFromAPI[], albumDetailFromAPI[]]) => {

      this.songs = [];

      results[0].forEach((song) => {

        this.songs.push({
          id: song.id,
          albumId: song.albumId,
          thumbNail: song.thumbnailUrl,
          name: song.title,
          playTime: 0,
          singers: ['Unknown'],
          albumName: results[1].find((album) => album.id === song.albumId).title
        })

      });

      subject.next(this.songs);
      subject.complete();
    });

    return subject.asObservable();
  }

  getSongs(start: number, end: number): song[]{
    return [...this.songs].splice(start, (end - start + 1));
  }

  getSong(songId: number) :song{
    return this.songs.find((song) => song.id === songId);
  }

  filterSongsByName(searchKey: string, count: number) : song[]{
    // const regex = RegExp(searchKey + '*');
    return [...this.songs.filter((song) => song.name.includes(searchKey))].splice(0, count);
  }

}
