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
      },
      {
        path: 'contacts',
        loadChildren: () => import('../contacts/contacts.module').then( m => m.ContactsPageModule)
      },
      {
        path: 'contacts/contact/:id',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'evenments',
        loadChildren: () => import('../evenments/evenments.module').then( m => m.EvenmentsPageModule)
      },
      {
        path: 'evenments/evenment/:id',
        loadChildren: () => import('../evenment/evenment.module').then( m => m.EvenmentPageModule)
      },
      {
        path: 'actions',
        loadChildren: () => import('../actions/actions.module').then( m => m.ActionsPageModule)
      },
      {
        path: 'actions/action/:id',
        loadChildren: () => import('../action/action.module').then( m => m.ActionPageModule)
      }

    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
