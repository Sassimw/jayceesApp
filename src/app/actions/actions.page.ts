import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { action } from '../shared/action';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  //public static notesNotDone:note[] = [] ;
  public list: Array<action> = [];
  private searchedItem: any;

  public isSearchBarOpened = false;
  public arrayOcc = 0;
  constructor(private actionService: NotesService, private alertCtrl: AlertController, route: ActivatedRoute) {
    //this called when navigate router to update the list
    route.params.subscribe(val => {
      //load and charge list
      this.loadAndChargeList();
    });
  }

  ngOnInit() {
    this.loadAndChargeList();
  }



  //Ajout d'une note

  async addNote() {

    this.alertCtrl.create({

      header: 'Nouvelle action',

      inputs: [{ type: 'text', name: 'title', placeholder: "Intitulé de l'action..." },

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
          this.actionService.createAction(data.title, data.content);
          this.list = this.actionService.actions;
          this.list.sort(
            (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
          );
          this.searchedItem = this.list;
          this.arrayOcc = 0;

          for (let i = 0; i < this.list.length; i++) {


            this.arrayOcc += 1;
            console.log('in for');
            console.log(this.arrayOcc);

          }


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
    this.actionService.loadAction().then(
      res => console.log('chargement des action avec succes ! ' + this.actionService.actions));
    this.list = this.actionService.actions;
    this.searchedItem = this.list;
    this.arrayOcc = 0;

    for (let i = 0; i < this.list.length; i++) {


      this.arrayOcc += 1;
      console.log('in for');
      console.log(this.arrayOcc);

    }

    console.log('number of occurences not done : ' + this.arrayOcc);


  }


}
