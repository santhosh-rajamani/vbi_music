import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private location: Location){}
  activeLink = 'songs';
  title = 'VBI-Music';

  ngOnInit(){
    if(this.location.path().includes("playlist")){
      this.activeLink = 'playlists';
    }
  }
}
