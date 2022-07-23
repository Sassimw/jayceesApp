import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { evenement } from '../shared/evenement';

@Component({
  selector: 'app-evenments',
  templateUrl: './evenments.page.html',
  styleUrls: ['./evenments.page.scss'],
})
export class EvenmentsPage implements OnInit {
  //public static notesNotDone:note[] = [] ;
  public list: Array<evenement> = [];
  private searchedItem: any;

  public isSearchBarOpened = false;
  public arrayOcc = 0;
  constructor(private eventService: NotesService, private alertCtrl: AlertController, route: ActivatedRoute) { 

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

      header: 'Nouvelle evenment',

      inputs: [{ type: 'text', name: 'title', placeholder: "Intitulé de l'evenment..." },

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
          this.eventService.createEvent(data.title, data.content);
          this.list = this.eventService.evenements;
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
    this.eventService.loadEvent().then(
      res => console.log('chargement des action avec succes ! ' + this.eventService.evenements));
    this.list = this.eventService.evenements;
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
