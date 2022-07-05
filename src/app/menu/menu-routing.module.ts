import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children:[ 

      { path: 'home', 

        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)}, 

      { path: 'profile', 

        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule) }, 

      { path: 'weather', 

        loadChildren: () => import('../weather/weather.module').then( m => m.WeatherPageModule)}, 

      { path: 'notes', 

        loadChildren: () => import('../notes/notes.module').then(m => m.NotesPageModule)},
      {
          path: 'notes/note/:id',
          loadChildren: () => import('../note/note.module').then( m => m.NotePageModule)
      },

      {
        path: 'home/note/:id',
        loadChildren: () => import('../note/note.module').then( m => m.NotePageModule)
      },
      {
        path: 'notes-history/note/:id',
        loadChildren: () => import('../note/note.module').then( m => m.NotePageModule)
      },
      {
        path: 'notes-history',
        loadChildren: () => import('../notes-history/notes-history.module').then( m => m.NotesHistoryPageModule)
      }

    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
