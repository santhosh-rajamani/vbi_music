import { Injectable } from '@angular/core';
import { playlist } from '../models/playlist.models';
import { song } from '../models/songs.models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  playlists: playlist[] = []

  constructor() { 
    var cachedPlaylists = JSON.parse(localStorage.getItem('playList'));
    if(cachedPlaylists){
      this.playlists = cachedPlaylists;
    }
  }

  getPlayLists() {
    return this.playlists;
  }

  getPlayList(id: number){
    return this.playlists.find((playlist) => playlist.id === id);
  }

  private cachePlayList(){
    localStorage.setItem('playList', JSON.stringify(this.playlists));
  }

  private getPlayListId(){
    if (this.playlists.length){
      return Math.max.apply(Math, this.playlists.map(function(o) { return o.id; })) + 1;
    } else {
      return 1;
    }
  }

  addNewPlayList(name: string) {
    this.playlists.push({
      id: this.getPlayListId(),
      name: name,
      createdAt: new Date(),
      songs: []
    });
    this.cachePlayList();
  }

  addSongToPlayList(playlistId: number, song: song) {
    let songs = this.playlists.find((playlist) => playlist.id === playlistId).songs;
    if(songs.find((thisSong) => thisSong.id === song.id)){
      // Skip the song if already exists
    } else {
      songs.push(song);
    }
    this.cachePlayList();
  }

  shufflePlayList(playlistId: number){
    let array = this.playlists.find((playlist) => playlist.id === playlistId).songs;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.playlists.find((playlist) => playlist.id === playlistId).songs = array;
  }

}
