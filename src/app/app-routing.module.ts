import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSongsComponent } from './components/all-songs/all-songs.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

const routes: Routes = [
  { path: 'songs', component: AllSongsComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'playlist/:id', component: PlaylistViewComponent},
  { path: '', redirectTo: '/songs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
