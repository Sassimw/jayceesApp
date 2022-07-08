import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NotesPage } from '../notes/notes.page';
import { contact } from '../shared/contact';
import { note } from '../shared/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes: note[] = [];
  public contacts: contact[] = [];

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

}
