import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { NotesService } from '../services/notes.service';
import { note } from '../shared/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  note: note;

  constructor(private route: ActivatedRoute, private router: Router,

    private notesService: NotesService, private alertCtrl: AlertController) {
    // Initialisation d'une note à vide
    this.note = { id: '', title: '', content: '', isDone: false };
  }

  ngOnInit() {

    // On récupère l'identifiant de la note
    let noteId = this.route.snapshot.paramMap.get('id');
    this.note = this.notesService.getNoteById(noteId);

  }

  deleteNote() {

    this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    );
    this.note = this.notesService.getLastNote();
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);

  }

  doneNote() {

    this.notesService.doneNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    );
    this.note = this.notesService.getLastNote();
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);

  }

  saveNote() {

    //this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    //);
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);
    this.alertCtrl.create({

      header: "Modification d'une note",

      inputs: [{ type: 'text', name: 'title', value: this.note.title },

      { type: 'text', name: 'content', id: 'note-content', value: this.note.content }],

      buttons: [{ text: 'Annuler' },

      {
        text: 'Modifier', handler: (data) => {

          if (data.title == "") {
            alert("Title is required !");
            return false;
          }
          if (data.content == "") {
            alert("Contenet is required !");
            return false;
          }
          this.note.content = data.content;
          this.note.title = data.title;
          this.note.time_stamp = new Date();
          this.notesService.modifyNote()
        }
      }]

    }).then((alert) => {
      alert.present();
    });
  }
}
