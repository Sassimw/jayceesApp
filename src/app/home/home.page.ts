import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { contact } from '../shared/contact';
import { note } from '../shared/note';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

 /* notes: Array<{ id: number; title: string; content: string }> =
    [{ id: 1, title: "Faires les courses", content: "acheter de quoi faire une bonne raclette. Difersifiers les types de fromages." },
    { id: 2, title: "Faire du sport", content: "Penser à bien m'etirer avant de commencer pour eviter toute courbature ou fracture." },
    { id: 3, title: "PFE", content: "Préparer la soutenance de stage et contacter mon tuteur." }]
  */
  note : note={
    id: '' ,
    title: '' ,
    content: '',
    isDone:false 
  }

  contact : contact={
    id: '' ,
    nom: '' ,
    tel: '',
    mail: ''
  }

  constructor(private notesService: NotesService , private alertCtrl:AlertController ) {

    this.notesService.initStorage();
 
  }
   

  ngOnInit(): void {
    
     this.notesService.load().then(res => {this.note= this.notesService.getLastNote() } )
     this.notesService.loadContacts().then(res => {this.contact= this.notesService.getLastContact() } )
  }

  //Ajout d'une note
  async addNote() {

    this.alertCtrl.create({

      header: 'Nouvelle note',

      inputs: [{ type: 'text', name: 'title', placeholder: 'Intitulé de la note...' },

      { type: 'text', name: 'content', id: 'note-content', placeholder: 'Saisissez votre texte ici...' }],

      buttons: [{ text: 'Annuler' },

      { text: 'Ajouter', handler: (data) => {
        if ( data.title==""  ){
          alert("Title is required !");
          return false;
        }
        if ( data.content==""  ){
          alert("Contenet is required !");
          return false;
        }
        this.notesService.createNote(data.title, data.content);
      this.note = this.notesService.getLastNote()} }]

    }).then((alert) => {
      alert.present();

    });

  }
}
