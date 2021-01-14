import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { song } from 'src/app/models/songs.models';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  songCount: number = 0;
  constructor(private songsService: SongsService) { }

  

  ngOnInit(): void {
    this.songsService.getAllSongs().subscribe((songList) => {
      this.songCount = songList.length;
      this.songs = this.songsService.getSongs(1, 10);
    });
  }

  pageEvent(event: PageEvent){
    let startIndex = event.pageIndex*event.pageSize + 1;
    let endIndex = (event.pageIndex + 1)*event.pageSize;
    this.songs = this.songsService.getSongs(startIndex, endIndex);
  }

  songs: song[] = [];

}
