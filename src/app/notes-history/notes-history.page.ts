import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { note } from '../shared/note';

@Component({
  selector: 'app-notes-history',
  templateUrl: './notes-history.page.html',
  styleUrls: ['./notes-history.page.scss'],
})
export class NotesHistoryPage implements OnInit {


  constructor(private notesService: NotesService, private alertCtrl: AlertController) {

  }

  ngOnInit() {
  }

  //Ajout d'une note

  async seeNote(note: note) {


    //this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    //);
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);
    this.alertCtrl.create({

      header: "Détails de la note",

      inputs: [{ type: 'text', name: 'title', value: note.title, disabled: true },
      { type: 'text', name: 'content', id: 'note-content', value: note.content, disabled: true }],
      buttons: [{ text: 'OK' }]
    }).then((alert) => {
      alert.present();
    });

  }
}
