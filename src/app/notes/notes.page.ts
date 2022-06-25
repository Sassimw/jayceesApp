import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
 


  constructor(private notesService: NotesService , private alertCtrl:AlertController  ) { }

  ngOnInit() {
    this.notesService.load().then(res=>console.log('chargement des notes avec succes ! ' + this.notesService.notes)) ;
  }



  //Ajout d'une note

  async addNote() {

    this.alertCtrl.create({

      header: 'Nouvelle note',

      inputs: [{ type: 'text', name: 'title', placeholder: 'Intitulé de la note...' },

      { type: 'text', name: 'content', id: 'note-content', placeholder: 'Saisissez votre texte ici...' }],

      buttons: [{ text: 'Annuler' },

      { text: 'Ajouter', handler: (data) => { this.notesService.createNote(data.title, data.content); } }]

    }).then((alert) => {
      alert.present();

    });

  }

}
