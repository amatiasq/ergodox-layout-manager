import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import Application from './components/application';
import LayoutComponent from './components/layout';
import HandComponent from './components/hand';
import KeyComponent from './components/key';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
  ],
  bootstrap: [ Application ],
  declarations: [
    Application,
    LayoutComponent,
    HandComponent,
    KeyComponent,
  ],
})
export default class AppModule {}
