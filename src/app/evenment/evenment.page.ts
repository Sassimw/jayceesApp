import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { evenement } from '../shared/evenement';

@Component({
  selector: 'app-evenment',
  templateUrl: './evenment.page.html',
  styleUrls: ['./evenment.page.scss'],
})
export class EvenmentPage implements OnInit {
  event: evenement;
  constructor(private route: ActivatedRoute, private router: Router,

    private eventService: NotesService, private alertCtrl: AlertController) { 

      this.event = { id: '', title: '', content: '', isDone: false };
    }

  ngOnInit() {
     // On récupère l'identifiant de la note
     let eventId = this.route.snapshot.paramMap.get('id');
     this.event = this.eventService.getEventById(eventId);
  }

  deleteNote() {

    this.eventService.deleteEvent(this.event).then(res => this.router.navigate(['menu/evenments'])).catch(err => console.log('erreur lors de supp !')
    );
    this.event = this.eventService.getLastEvent();
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);

  }
  saveNote() {

    //this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    //);
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);
    this.alertCtrl.create({

      header: "Modification d'un evenment",

      inputs: [{ type: 'text', name: 'title', value: this.event.title },

      { type: 'text', name: 'content', id: 'note-content', value: this.event.content }],

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
          this.event.content = data.content;
          this.event.title = data.title;
          this.event.time_stamp = new Date();
          this.eventService.modifyEvent()
        }
      }]

    }).then((alert) => {
      alert.present();
    });
  }

}
