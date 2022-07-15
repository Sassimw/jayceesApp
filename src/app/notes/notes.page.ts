import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { note } from '../shared/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {


  //public static notesNotDone:note[] = [] ;
  public list: Array<note> = [];
  private searchedItem: any;

  public isSearchBarOpened = false;


  constructor(private notesService: NotesService, private alertCtrl: AlertController, route: ActivatedRoute) {
    //this called when navigate router to update the list
    route.params.subscribe(val => {
       //load and charge list
       this.loadAndChargeList();
    });
  }

  ngOnInit() {
     //load and charge list
     this.loadAndChargeList();
    /*for(let i=0;i<this.notesService.notes.length; i++){   
      if(this.notesService.notes[i].isDone==false) { 
        NotesPage.notesNotDone.push(this.notesService.notes[i]);           
      }  
    }*/
  }



  //Ajout d'une note

  async addNote() {

    this.alertCtrl.create({

      header: 'Nouvelle note',

      inputs: [{ type: 'text', name: 'title', placeholder: 'Intitulé de la note...' },

      { type: 'text', name: 'content', id: 'note-content', placeholder: 'Saisissez votre texte ici...' }],

      buttons: [{ text: 'Annuler' },

      {
        text: 'Ajouter', handler: (data) => {
          if (data.title == "") {
            alert("Title is required !");
            return false;
          }
          if (data.content == "") {
            alert("Contenet is required !");
            return false;
          }
          this.notesService.createNote(data.title, data.content);
          this.list = this.notesService.notes;
          this.list.sort(
            (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
          );
          this.searchedItem = this.list;
        }
      }]

    }).then((alert) => {
      alert.present();

    });

  }

  onChangeSearch(event) {
    console.log(event.detail.value + 'success called');
    const val = event.target.value;

    this.searchedItem = this.list;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  changeIsopenedStatus() {
    if (this.isSearchBarOpened) {
      this.isSearchBarOpened = false;
      //load and charge list
      this.loadAndChargeList();
    }
    else {
      this.isSearchBarOpened = true;
    }

  }

  searchBarCancel() {
    this.isSearchBarOpened = false;
    //load and charge list
    this.loadAndChargeList();
  }

  loadAndChargeList() {
    this.notesService.load().then(res => console.log('chargement des notes avec succes ! ' + this.notesService.notes));
    this.list = this.notesService.notes;
    this.searchedItem = this.list;
     
  

  }
}
