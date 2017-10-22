import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { ControlsComponent } from './controls/controls.component';
import { QueueComponent } from './queue/queue.component';
import { PlayerComponent } from './player/player.component';

const config: SocketIoConfig = { url: 'http://' + window.location.hostname + ':3001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    QueueComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
