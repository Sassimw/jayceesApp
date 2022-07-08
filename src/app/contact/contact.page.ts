import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContactsPage } from '../contacts/contacts.page';
import { NotesService } from '../services/notes.service';
import { contact } from '../shared/contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  contact: contact;

  constructor(private route: ActivatedRoute, private router: Router,

    private contactService: NotesService,private alertCtrl:AlertController) {
    // Initialisation d'une note à vide
    this.contact = { id: '', nom: '', tel: '',mail:'' };
  }

  ngOnInit() {

    // On récupère l'identifiant de la note
    let contactId = this.route.snapshot.paramMap.get('id');
    this.contact = this.contactService.getContactById(contactId);

  }

  deleteContact() {

    this.contactService.deleteContact(this.contact).then(res => this.router.navigate(['menu/contacts'])).catch(err => console.log('erreur lors de supp !')
    );
    this.contact=this.contactService.getLastContact();
   // window.location.reload();
  }

   

  saveContact() {

    //this.notesService.deleteNote(this.note).then(res => this.router.navigate(['menu/notes'])).catch(err => console.log('erreur lors de supp !')
    //);
    // Redirection vers la page Notes
    //this.router.navigate(['menu/notes']);
    this.alertCtrl.create({

      header: "Modification d'un contact",

      inputs: [{ type: 'text', name: 'nom', value: this.contact.nom },

      { type: 'text', name: 'tel', id: 'tel', value: this.contact.tel },
      { type: 'text', name: 'mail', id: 'mail', value: this.contact.mail }
    ],

      buttons: [{ text: 'Annuler' },

      { text: 'Modifier', handler: (data) => { 
        
        if ( data.nom==""){
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


      this.contact.nom=data.nom;
      this.contact.tel = data.tel;
      this.contact.mail=data.mail;
      this.contact.time_stamp = new Date() ;
      this.contactService.modifyContact() } 
      
    }]

    }).then((alert) => {
      alert.present();
    });
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
    if (/[1-9]/ .test(data.tel)) {
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

}
