import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilesService } from './services/files.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArchivoComponent } from './components/archivo/archivo.component';

@NgModule({
  declarations: [
    AppComponent,
    ArchivoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    FilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
