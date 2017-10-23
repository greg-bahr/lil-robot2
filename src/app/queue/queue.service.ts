import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map';

@Injectable()
export class QueueService {

  public currentTimer: number;
  private timerInterval: any;

  constructor(private socket: Socket) {
    socket.on('timer', (data) => {
      this.currentTimer = data;
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => this.currentTimer--, 1000);
    });
  }

  receiveQueue() {
    return this.socket
      .fromEvent<any>('sendQueue');
  }
}
