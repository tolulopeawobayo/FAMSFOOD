import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material.module';
import { SharedDataService } from './shared/shared-data.service';
import { RestApiService } from './shared/rest-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MaterialModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [SharedDataService, RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
