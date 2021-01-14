import { Component, Input, OnInit } from '@angular/core';
import { song } from 'src/app/models/songs.models';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  @Input()
  song: song;

  constructor() { }

  ngOnInit(): void {
  }

}
