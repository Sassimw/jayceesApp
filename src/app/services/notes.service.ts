import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { note } from '../shared/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public notes:note[] = [] ;

  constructor(private storage:Storage) { }

  async initStorage() {
    await this.storage.create();
  }

  // charger tous les notes de db
  async load(){
    let  notes= await this.storage.get('notes'); 
    if (notes)
      { this.notes =notes ;}  
  }

  //sauvgarde des notes
  async save(){
    await this.storage.set('notes',this.notes);
  }

  //get note by id
  getNoteById(id:string):note {
    return this.notes.find( note=>note.id===id );
  }

  //creation d'un note
  async createNote(title:string,content:string){

    let id = Math.max(...this.notes.map(note=>parseInt(note.id) ),0)+1 ; 
    this.notes.push({
        id: id.toString(),
        title : title ,
        content : content ,
        time_stamp : new Date() 
    })

    await this.save() ;     

  }

  //supprimer note
  async deleteNote(note:note){

    let index = this.notes.indexOf(note);
    
    if ( index > -1 )
      { 
        this.notes.splice(index,1);
        await this.save();
      }
  }

}
