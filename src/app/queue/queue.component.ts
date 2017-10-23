import {Component, OnDestroy, OnInit} from '@angular/core';
import { QueueService } from "./queue.service";
import {Subscription} from "rxjs/Subscription";

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

  constructor(queueService: QueueService) {
    this.queueService = queueService;
    this.queueSubscription = queueService.receiveQueue().subscribe(
      value => this.queue = value,
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.queueSubscription.unsubscribe();
  }
}
