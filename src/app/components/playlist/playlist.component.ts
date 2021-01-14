import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { playlist } from 'src/app/models/playlist.models';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  @Input()
  playlist: playlist

  constructor(public router: Router) { }

  goToPlaylist(id: number){
    this.router.navigate(['/playlist', id]);
  }

  ngOnInit(): void {
  }

}
