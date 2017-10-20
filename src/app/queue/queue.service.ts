import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';

@Injectable()
export class QueueService {

  private currentTimer: number;

  constructor(private socket: Socket) {
    socket.on('timer', data => this.currentTimer = data);
  }

  receiveQueue() {
    return this.socket
      .fromEvent<any>('sendQueue');
  }
}
