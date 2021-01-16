import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { playlist } from 'src/app/models/playlist.models';
import { ConfirmationDialog } from '../dialogs/confirmation-dialog';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input()
  playlist: playlist

  @Output() playlistRemoved = new EventEmitter<number>();

  constructor(private router: Router) { }

  goToPlaylist(id: number){
    this.router.navigate(['/playlist', id]);
  }

  deletePlayist(e: Event, id: number){
    this.playlistRemoved.emit(id);
    e.stopPropagation();
  }

  ngOnInit(): void {
  }

}
