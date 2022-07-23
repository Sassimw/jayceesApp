import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { action } from '../shared/action';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {

  action: action;
  constructor(private route: ActivatedRoute, private router: Router,

    private actionsService: NotesService, private alertCtrl: AlertController) {
      this.action = { id: '', title: '', content: '', isDone: false };
     }

  ngOnInit() {
        // On récupère l'identifiant de la note
        let actionId = this.route.snapshot.paramMap.get('id');
        this.action = this.actionsService.getActionById(actionId);
  }
  deleteNote() {

    this.actionsService.deleteAction(this.action).then(res => this.router.navigate(['menu/actions'])).catch(err => console.log('erreur lors de supp !')
    );
    this.action = this.actionsService.getLastAction();
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);

  }
  saveNote() {

    //this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    //);
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);
    this.alertCtrl.create({

      header: "Modification d'une action",

      inputs: [{ type: 'text', name: 'title', value: this.action.title },

      { type: 'text', name: 'content', id: 'note-content', value: this.action.content }],

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
          this.action.content = data.content;
          this.action.title = data.title;
          this.action.time_stamp = new Date();
          this.actionsService.modifyAction()
        }
      }]

    }).then((alert) => {
      alert.present();
    });
  }
}
