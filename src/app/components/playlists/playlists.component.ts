import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { playlist } from 'src/app/models/playlist.models';
import { PlaylistsService } from 'src/app/services/playlists.service';
import { AddPlayListDialog } from '../dialogs/add-playlist.dialog';
import { ConfirmationDialog } from '../dialogs/confirmation-dialog';

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

  removePlaylist(value): void{
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '340px',
      data: {text: 'Are you sure you want to delete this playlist?'}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){ 
        this.playlistService.removePlaylist(value);
        this.refreshPlaylist();
      }
    });
  }

  ngOnInit(): void {
    this.refreshPlaylist()
  }

}
