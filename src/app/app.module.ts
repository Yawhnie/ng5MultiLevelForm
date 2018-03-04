import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PersonalDetailsComponent } from './forms/personal-details/personal-details.component';
import { ContactDetailsComponent } from './forms/contact-details/contact-details.component';
import { SaveService } from './save.service';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [
    AppComponent,
    PersonalDetailsComponent,
    ContactDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [SaveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
