import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { playlist } from 'src/app/models/playlist.models';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { AddPlayListDialog } from '../dialogs/add-playlist.dialog';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists: playlist[] = [];

  constructor(private playlistService: PlaylistsService, public dialog: MatDialog) { }

  refreshPlaylist(){
    this.playlists = this.playlistService.getPlayLists();
  }

  addNewPlayList(): void {
    const dialogRef = this.dialog.open(AddPlayListDialog, {
      width: '250px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name != '') {
        this.playlistService.addNewPlayList(name);
        this.refreshPlaylist();
      }
    });
  }

  ngOnInit(): void {
    this.refreshPlaylist()
  }

}
