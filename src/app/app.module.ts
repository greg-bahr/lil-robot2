import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import {AppComponent, NameDialogComponent} from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { QueueComponent } from './queue/queue.component';
import { PlayerComponent } from './player/player.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatDialogModule, MatInputModule} from "@angular/material";
import {FormsModule} from "@angular/forms";

const config: SocketIoConfig = { url: 'http://' + window.location.hostname + ':3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    QueueComponent,
    PlayerComponent,
    NameDialogComponent
  ],
  entryComponents: [
    NameDialogComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
