import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { song } from 'src/app/models/songs.models';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  isSearchResults = false;
  searchControl = new FormControl();
  searchKey = "";

  songs: song[] = [];
  songCount: number = 0;
  pageSize: number = 10;
  // subscriptions: Subscription[] = [];
  subscription: Subscription = null;

  constructor(private songsService: SongsService) { }

  ngOnInit(): void {
   this.getAllSongs()
  }

  getAllSongs(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.songsService.getAllSongs().subscribe((songList) => {
      this.songCount = songList.length;
      this.paginator.pageIndex = 0;
      this.songs = this.songsService.getSongs(1, 10);
    });
    
  }

  clearSearch(){
    this.searchKey = "";
    this.isSearchResults = false;
    this.getAllSongs();
  }

  searchAdvanced(){
    if(this.searchKey === '') {
      return;
    }
    this.isSearchResults = true;
    this.pageSize = 10; //resetting
    this.getAllSongs();
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.songsService.searchForSongs(this.searchKey).subscribe((songList) => {
      this.songCount = songList.length;
      this.paginator.pageIndex = 0;
      this.songs = this.songsService.getSongs(1, 10);
    });
    // subscription.unsubscribe();
  }

  pageEvent(event: PageEvent){
    let startIndex = event.pageIndex*event.pageSize + 1;
    let endIndex = (event.pageIndex + 1)*event.pageSize;
    this.songs = this.songsService.getSongs(startIndex, endIndex);
  }

  ngOnDestroy() {
    // this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
