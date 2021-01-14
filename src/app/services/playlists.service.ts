import { Injectable } from '@angular/core';
import { playlist } from '../models/playlist.models';
import { song } from '../models/songs.models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  playlists: playlist[] = []

  constructor() { }

  getPlayLists() {
    return this.playlists;
  }

  getPlayList(id: number){
    return this.playlists.find((playlist) => playlist.id === id);
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
    })
  }

  addSongToPlayList(playlistId: number, song: song) {
    this.playlists.find((playlist) => playlist.id === playlistId).songs.push(song);
  }

}
