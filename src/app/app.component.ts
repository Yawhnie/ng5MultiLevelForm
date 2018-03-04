import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { SaveService } from './save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  projectForm:FormGroup;
  disAllowedProjectNames = ['test','demo'];

  statuses:any = [
    {code:'1',description:'Stable'},
    {code:'2',description:'Critical'},
    {code:'3',description:'Finished'},
  ]

  constructor(private saveService:SaveService){

  }

  ngOnInit() {
    
    this.projectForm =new FormGroup({
      'projectName': new FormControl(
                      null,
                      [Validators.required,this.isNameValid.bind(this)],
                      this.isNameValidAsync.bind(this)),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'status':new FormControl(null)
    });
  }

  onSaveProject(){
    console.log(this.projectForm);
  }
  isNameValid(control:FormControl): {[s:string]:boolean}{

    if(this.disAllowedProjectNames.indexOf(this.lowerCase(control.value)) != -1){
      
      return {'disAllowedProject':false};

    }
    return null;
  }

  isNameValidAsync(control:FormControl):Observable<any> | Promise<any>{

    const promise = new Promise<any>((resolve,reject) =>{
      setTimeout(()=>{
        if(this.disAllowedProjectNames.indexOf(this.lowerCase(control.value)) != -1){
          resolve(
            {'disAllowedProjectAsyc':false}
          )
        }else{
          resolve(null)
        }
      },5000)
    }

    );

    return promise;
  }

  lowerCase(value:any):string{
    return value == null?null:<string>value.toLowerCase()

  }
  globalSaveBtn(){
    console.log("saving");
    this.saveService.saveGlobalSubject.next(true);
  }
}
