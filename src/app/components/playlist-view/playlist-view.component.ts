import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { playlist } from 'src/app/models/playlist.models';
import { song } from 'src/app/models/songs.models';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { SongsService } from 'src/app/services/songs.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.css']
})
export class PlaylistViewComponent implements OnInit {

  id: number;
  playlist: playlist;
  playlistSongs: song[];
  filteredSongs: song[];
  selectedSong: song;
  searchControl = new FormControl();

  constructor(private route: ActivatedRoute, private playlistService: PlaylistsService, private songService: SongsService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.playlist = this.playlistService.getPlayList(this.id);

    this.searchControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(searchKey => {
      console.log('Heyyy')
      this.filteredSongs = this.songService.filterSongsByName(searchKey, 10);
    });

    this.refreshSongs()
  //  this.filteredSongs = songList
  }

  displayFn(playlist: playlist): string {
    return playlist && playlist.name ? playlist.name : '';
  }

  refreshSongs(){
    this.playlistSongs = this.playlistService.getPlayList(this.id).songs;
  }

  selectSong(song: song){
    this.selectedSong = song;
  }

  addNewSong(){
    if(this.selectedSong != null) {
      this.playlistService.addSongToPlayList(this.id, this.selectedSong);
      this.refreshSongs();
      this.selectedSong = null;
      this.searchControl.reset();
    }
  }
}
