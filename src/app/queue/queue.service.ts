import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';

@Injectable()
export class QueueService {
  constructor(private socket: Socket) { }

  receiveCurrentQueue() {
    return this.socket
      .fromEvent<any>('sendQueue')
      .map(data => data.queue);
  }
}