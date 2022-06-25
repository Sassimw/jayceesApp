import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { note } from '../shared/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  note: note;

  constructor(private route: ActivatedRoute, private router : Router,

              private notesService : NotesService) {
              // Initialisation d'une note à vide
              this.note = {id: '', title: '', content: ''}; }

  ngOnInit() {

    // On récupère l'identifiant de la note
    let noteId = this.route.snapshot.paramMap.get('id');
    this.note = this.notesService.getNoteById(noteId);

  }

  deleteNote() {

    this.notesService.deleteNote(this.note).then( res=>this.router.navigate(['menu/notes']) ).catch(err=>console.log('erreur lors de supp !')
    );
     // Redirection vers la page Notes
     //this.router.navigate(['menu/notes']);

    }
  }
