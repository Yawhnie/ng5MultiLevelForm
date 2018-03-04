import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveService } from '../../save.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit , OnDestroy {

  formPersonalDetails:FormGroup;
  save:Subscription;

  constructor(private saveService:SaveService) { 
  }

  ngOnInit() {


    this.formPersonalDetails = new FormGroup(
      {
        'last-name':new FormControl(null,Validators.required,null),
        'first-name':new FormControl(null,null,null),
        'address':new FormControl(null,null,null),
        'tel':new FormControl(null,null,null),
        'cell':new FormControl(null,null,null),
        'dob':new FormControl(null,null,null),
        'sin':new FormControl(null,null,null),
      }
    );


  this.save = this.saveService.saveGlobalSubject.subscribe(
      (a:boolean)=>{
        if(this.formPersonalDetails.valid == true){
          console.log(this.formPersonalDetails)
        }else{
          console.log("Invalid Form")
        }
      }
    );
  }

  ngOnDestroy(){
    this.save.unsubscribe();
  }

}
