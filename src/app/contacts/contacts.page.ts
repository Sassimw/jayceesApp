import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContactsService } from '../services/contacts.service';
import { NotesService } from '../services/notes.service';
import { contact } from '../shared/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  public listContact: Array<contact> = [];
  private searchedItemContact: any;

  public isSearchBarOpenedContact = false;
  


  constructor(private contactsService: NotesService, private alertCtrl: AlertController, route: ActivatedRoute) {

    //this called when navigate router to update the list
    route.params.subscribe(val => {
      // this and load charge list
      this.loadAndChargeList();

    });
  }

  ngOnInit() {
    // this and load charge list
    this.loadAndChargeList();
  }

  //Ajout d'une note

  async addContact() {

    this.alertCtrl.create({

      header: 'Nouveau contact',

      inputs: [{ type: 'text', name: 'nom', placeholder: 'Nom du contact' },

      { type: 'tel', name: 'tel', id: 'tel', placeholder: 'Numero de tel' },
      { type: 'email', name: 'mail', id: 'mail', placeholder: 'Mail ' }
      ],

      buttons: [{ text: 'Annuler' },

      {
        text: 'Ajouter', handler: (data) => {

          if (data.nom == "") {
            alert("Name can't be empty");
            return false;
          }
          let validateTel = this.validateTel(data);
          if (!validateTel.isValid) {
            alert(validateTel.messageTel);
            return false;
          }


          let validateMail = this.validateEmail(data);
          if (!validateMail.isValid) {

            alert(validateMail.messageEmail);
            return false;
          }



          this.contactsService.createContact(data.nom, data.tel, data.mail);
          this.listContact = this.contactsService.contacts;
          this.listContact.sort(
            (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
          );
          this.searchedItemContact = this.listContact;
        }
      }]

    }).then((alert) => {
      alert.present();

    });

  }

  onChangeSearchContact(event) {
    console.log(event.detail.value + 'success called');
    const val = event.target.value;

    this.searchedItemContact = this.listContact;
    if (val && val.trim() != '') {
      this.searchedItemContact = this.searchedItemContact.filter((item: any) => {
        return (item.nom.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  changeIsopenedStatus() {
    if (this.isSearchBarOpenedContact) {
      this.isSearchBarOpenedContact = false;
      //load and charge list
      this.loadAndChargeList();

    }
    else {
      this.isSearchBarOpenedContact = true;
    }

  }
  searchBarCancel() {
    this.isSearchBarOpenedContact = false;
    // load and charge list
    this.loadAndChargeList();

  }

  validateEmail(data) {
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(data.mail)) {
      return {
        isValid: true,
        messageEmail: ''
      };
    } else {
      return {
        isValid: false,
        messageEmail: 'Please verify the mail.'
      }
    }

  }

  validateTel(data) {
    if (/[1-9]/.test(data.tel)) {
      return {
        isValid: true,
        messageTel: ''
      };
    } else {
      return {
        isValid: false,
        messageTel: 'Please verify the tel.'
      }
    }

  }
  loadAndChargeList() {
    this.contactsService.loadContacts().then(res => console.log('chargement des contacts avec succes ! ' + this.contactsService.contacts));
    this.listContact = this.contactsService.contacts;
    this.searchedItemContact = this.listContact;
    
  }
}
