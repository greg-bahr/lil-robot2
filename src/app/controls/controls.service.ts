import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class ControlsService {

  constructor(private socket: Socket) {}

  public emitPressed(button) {
    this.socket.emit('buttonPressed', button);
  }
}
