import { Component, OnInit } from '@angular/core';
import { QueueService } from "./queue.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  providers: [QueueService]
})
export class QueueComponent {

  queue: object[];
  queueSubscription: Subscription;

  constructor(queueService: QueueService) {
    this.queueSubscription = queueService.receiveQueue().subscribe(
      value => this.queue = value,
      error => console.log(error)
    );
  }

}
