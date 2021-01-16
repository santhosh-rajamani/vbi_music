import { Injectable } from '@angular/core';
import { playlist } from '../models/playlist.models';
import { song } from '../models/songs.models';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  playlists: playlist[] = []

  constructor(private messageService: MessageService) { 
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
    if(this.playlists.find(playlist => playlist.name === name)){
      this.messageService.showMessage('Failed to add playlist. A playlist of the same name already exists');
      return;
    }
    this.playlists.push({
      id: this.getPlayListId(),
      name: name,
      createdAt: new Date(),
      songs: []
    });
    this.messageService.showMessage('Playlist successfully added');
    this.cachePlayList();
  }

  addSongToPlayList(playlistId: number, song: song) {
    let songs = this.playlists.find((playlist) => playlist.id === playlistId).songs;
    if(songs.find((thisSong) => thisSong.id === song.id)){
      // Skip the song if already exists
      this.messageService.showMessage('Song already exists in the playlist');
    } else {
      songs.push(song);
      this.messageService.showMessage('Playlist has been updated with a new song.');
    }
    this.cachePlayList();
  }

  removeSongFromPlaylist(playlistId: number, songId: number){
    const songs = this.playlists.find((playlist) => playlist.id === playlistId).songs;
    const songIndex = songs.map(function(e) { return e.id; }).indexOf(songId);
    if(songIndex > -1){
      songs.splice(songIndex, 1);
      this.messageService.showMessage('This song has been removed from your playlist');
      this.cachePlayList();
    }
  }

  shufflePlayList(playlistId: number){
    let array = this.playlists.find((playlist) => playlist.id === playlistId).songs;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    this.playlists.find((playlist) => playlist.id === playlistId).songs = array;
  }

  removePlaylist(playlistId: number){
    this.playlists = this.playlists.filter(item => item.id !== playlistId);
    this.cachePlayList();
    this.messageService.showMessage('Playlist has been removed');
  }



}
