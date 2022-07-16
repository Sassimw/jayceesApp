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
  //public static notesNotDone:note[] = [] ;
  public list2: Array<note> = [];
  private searchedItem2: any;

  public isSearchBarOpened2 = false;
  public arrayOccDone = 0;

  constructor(private notesService: NotesService, private alertCtrl: AlertController) {

  }

  ngOnInit() {
    //load and charge list
    this.loadAndChargeList();
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

  onChangeSearchHistory(event) {
    console.log(event.detail.value + 'success called');
    const val = event.target.value;

    this.searchedItem2 = this.list2;
    if (val && val.trim() != '') {
      this.searchedItem2 = this.searchedItem2.filter((item: any) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  changeIsopenedStatus() {
    if (this.isSearchBarOpened2) {
      this.isSearchBarOpened2 = false;
      //load and charge list
      this.loadAndChargeList();
    }
    else {
      this.isSearchBarOpened2 = true;
    }

  }

  searchBarCancel() {
    this.isSearchBarOpened2 = false;
    //load and charge list
    this.loadAndChargeList();
  }

  loadAndChargeList() {
    this.notesService.load().then(res => console.log('chargement des notes avec succes ! ' + this.notesService.notes));
    this.list2 = this.notesService.notes;
    this.searchedItem2 = this.list2;

    this.arrayOccDone = 0;
   
    for (let i = 0; i < this.searchedItem2.length; i++) {

      if (this.searchedItem2[i].isDone) {
        this.arrayOccDone += 1;
         
      }
    }

    console.log('number of occurences done : ' + this.searchedItem2);
  }
}
