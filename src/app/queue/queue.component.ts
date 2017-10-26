import {Component, OnDestroy, OnInit} from '@angular/core';
import { QueueService } from "./queue.service";
import {Subscription} from "rxjs/Subscription";
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  providers: [QueueService]
})
export class QueueComponent implements OnDestroy {

  queue: object[];
  queueSubscription: Subscription;
  queueService: QueueService;
  socket: Socket;

  constructor(queueService: QueueService, socket: Socket) {
    this.queueService = queueService;
    this.socket = socket;
    this.queueSubscription = queueService.receiveQueue().subscribe(
      value => this.queue = value,
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.queueSubscription.unsubscribe();
  }
}
