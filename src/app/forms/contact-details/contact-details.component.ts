import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SaveService } from '../../save.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit , OnDestroy{

  contactForm:FormGroup;
  saving:Subscription;
  contacts = [];

  nokContacts = [
    {
      id:"1",
      name:"Yonah",
      rel:"Uncle",
      tel:"737373737",
      cel:"63636363"
    }, {
      id:"2",
      name:"Soffie",
      rel:"Aunty",
      tel:"967494",
      cel:"3131415"
    }, {
      id:"3",
      name:"Max",
      rel:"Brother",
      tel:"52525525",
      cel:"6363636"
    }
  ];

  constructor(private frmBuilder:FormBuilder,private saveService:SaveService) { 
    
  }

  contactArray():any[]{

    for(let contact of this.nokContacts){
     
      console.log(contact['id']);

      var fm = this.frmBuilder.group({
            'id':[contact['id']],
            'name':[contact['name'],Validators.required],
            'rel':[contact['rel']],
            'tel':[contact['tel'],Validators.required],
            'cell':[contact['cel'],Validators.required]
      })

      this.contacts.push(fm)

    }
    return this.contacts;
  }
  ngOnInit() {
    
    this.contactForm = this.frmBuilder.group(
      {
        "contacts":this.frmBuilder.array(
          this.contactArray()
        //   [
        //   this.frmBuilder.group({
        //     'id':['1'],
        //     'name':["yonah",Validators.required],
        //     'rel':["reuben"],
        //     'tel':["288228",Validators.required],
        //     'cell':["727272",Validators.required]
        //   }), this.frmBuilder.group({
        //     'id':['1'],
        //     'name':["TTT",Validators.required],
        //     'rel':["reuben"],
        //     'tel':["288228",Validators.required],
        //     'cell':["727272",Validators.required]
        //   })
        // ]
      )
      }
    );

    this.saving = this.saveService.saveGlobalSubject.subscribe(
      (s:boolean)=>{
        this.onSave()
      }
    );
    //console.log(this.contactForm);
    console.log(this.contactForm.get('contacts'));
  }
  ngOnDestroy(){
    this.saving.unsubscribe();
  }

  onAddContact(){
    (<FormArray>this.contactForm.get('contacts')).push(
      new FormGroup(
        {
            'id':new FormControl(this.setId(),null,null),
            'name':new FormControl(null,Validators.required),
            'rel':new FormControl(null),
            'tel':new FormControl(null,Validators.required),
            'cell':new FormControl(null,Validators.required)
        }
      )
    )
  }

  setId():number{
    var max = 0;
    setTimeout(()=>{

      console.log('ddd')
    },2000)

    
    var array = this.contactForm.get('contacts').controls;

    for(var i=0;i < array.length; i++){
      console.log(array[i].values)
      if(array[i].value['id'] > (max || 0))
        max = array[i].value['id']
    }
    
    return parseInt(max)+1;
  }

  onSave(){
    console.log("Saving Contacts", this.contactForm);
  }

}
