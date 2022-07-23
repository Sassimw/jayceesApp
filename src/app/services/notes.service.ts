import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { action } from '../shared/action';
import { contact } from '../shared/contact';
import { evenement } from '../shared/evenement';
import { note } from '../shared/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: note[] = [];
  public contacts: contact[] = [];
  public evenements: evenement[] = [];
  public actions: action[] = [];

  constructor(private storage: Storage) { }

  async initStorage() {
    await this.storage.create();
  }

  // charger tous les notes de db
  async load() {
    let notes = await this.storage.get('notes');
    if (notes) {
      this.notes = notes;
      this.notes.sort(
        (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
      );

    }



  }

  //sauvgarde des notes
  async save() {
    await this.storage.set('notes', this.notes);
  }

  //get note by id
  getNoteById(id: string): note {
    return this.notes.find(note => note.id === id);
  }

  //creation d'un note
  async createNote(title: string, content: string) {

    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;
    this.notes.push({
      id: id.toString(),
      title: title,
      content: content,
      time_stamp: new Date(),
      isDone: false
    })

    await this.save();
    this.load();

  }
  //modification d'un note 
  async modifyNote() {
    await this.save();
    this.load();

  }
  //supprimer note
  async deleteNote(note: note) {

    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
      await this.save();
      this.load();
    }
  }
  //supprimer note
  async doneNote(note: note) {

    note.isDone = true;
    await this.save();
    this.load();

  }
  //renvoie la derniere note
  getLastNote(): note {
    //return this.notes[this.notes.length-1] ;
    // after sorting the table we have to change the index of the table
    this.notes.sort(
      (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
    );
    return this.notes[0];
  }

  /* Contact ********************************************************************************************************************/

  // charger tous les contacts de db
  async loadContacts() {
    let contacts = await this.storage.get('contacts');
    if (contacts) {
      console.log("contacts" + contacts)
      this.contacts = contacts;
      this.contacts.sort(
        (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
      );

    }

  }

  //sauvgarde des notes
  async saveContacts() {
    await this.storage.set('contacts', this.contacts);
  }

  //get contact by id
  getContactById(id: string): contact {
    return this.contacts.find(contact => contact.id === id);
  }

  //creation d'un contact
  async createContact(nom: string, tel: string, mail: string) {

    let id = Math.max(...this.contacts.map(contact => parseInt(contact.id)), 0) + 1;
    this.contacts.push({
      id: id.toString(),
      nom: nom,
      tel: tel,
      mail: mail,
      time_stamp: new Date()

    })

    await this.saveContacts();
    this.loadContacts();

  }

  //modification d'un contact 
  async modifyContact() {
    await this.saveContacts();
    this.loadContacts();

  }


  //supprimer contact
  async deleteContact(contact: contact) {

    let index = this.contacts.indexOf(contact);

    if (index > -1) {
      this.contacts.splice(index, 1);
      await this.saveContacts();
      this.loadContacts();
    }
  }

  //renvoie la derniere note
  getLastContact(): contact {
    //return this.notes[this.notes.length-1] ;
    // after sorting the table we have to change the index of the table
    this.contacts.sort(
      (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
    );
    return this.contacts[0];
  }

  /* Events ********************************************************************************************************************/
  // charger tous les events de db
  async loadEvent() {
    let evenements = await this.storage.get('events');
    if (evenements) {
      this.evenements = evenements;
      this.evenements.sort(
        (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
      );

    }



  }

  //sauvgarde des notes
  async saveEvent() {
    await this.storage.set('events', this.evenements);
  }

  //get note by id
  getEventById(id: string): evenement {
    return this.evenements.find(evenement => evenement.id === id);
  }

  //creation d'un note
  async createEvent(title: string, content: string) {

    let id = Math.max(...this.evenements.map(evenement => parseInt(evenement.id)), 0) + 1;
    this.evenements.push({
      id: id.toString(),
      title: title,
      content: content,
      time_stamp: new Date(),
      isDone: false
    })

    await this.saveEvent();
    this.loadEvent();

  }
  //modification d'un event 
  async modifyEvent() {
    await this.saveEvent();
    this.loadEvent();

  }
  //supprimer event
  async deleteEvent(evenement: evenement) {

    let index = this.evenements.indexOf(evenement);

    if (index > -1) {
      this.evenements.splice(index, 1);
      await this.saveEvent();
      this.loadEvent();
    }
  }
   
  //renvoie la derniere note
  getLastEvent(): evenement {
    //return this.notes[this.notes.length-1] ;
    // after sorting the table we have to change the index of the table
    this.evenements.sort(
      (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
    );
    return this.evenements[0];
  }

   /* Actions ********************************************************************************************************************/
  // charger tous les events de db
  async loadAction() {
    let actions = await this.storage.get('actions');
    if (actions) {
      this.actions = actions;
      this.actions.sort(
        (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
      );

    }



  }

  //sauvgarde des notes
  async saveAction() {
    await this.storage.set('actions', this.actions);
  }

  //get note by id
  getActionById(id: string): action {
    return this.actions.find(actions => actions.id === id);
  }

  //creation d'un note
  async createAction(title: string, content: string) {

    let id = Math.max(...this.actions.map(evenement => parseInt(evenement.id)), 0) + 1;
    this.actions.push({
      id: id.toString(),
      title: title,
      content: content,
      time_stamp: new Date(),
      isDone: false
    })

    await this.saveAction();
    this.loadAction();

  }
  //modification d'un event 
  async modifyAction() {
    await this.saveAction();
    this.loadAction();

  }
  //supprimer event
  async deleteAction(action: action) {

    let index = this.actions.indexOf(action);

    if (index > -1) {
      this.actions.splice(index, 1);
      await this.saveAction();
      this.loadAction();
    }
  }
   
  //renvoie la derniere note
  getLastAction(): action {
    //return this.notes[this.notes.length-1] ;
    // after sorting the table we have to change the index of the table
    this.actions.sort(
      (objA, objB) => objB.time_stamp.getTime() - objA.time_stamp.getTime(),
    );
    return this.actions[0];
  }



}
