import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { song } from 'src/app/models/songs.models';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  @Input()
  song: song;

  isDeletable: Boolean = false;

  @Input()
  removable: Boolean = false;

  @Output() songRemoved = new EventEmitter<number>();



  constructor() { }

  ngOnInit(): void {
  }

  deleteSong(e: Event, id: number){
    this.songRemoved.emit(id);
    e.stopPropagation();
  }

}
