import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  currPressed = 'None';

  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent) {
    event.stopPropagation();
    this.currPressed = event.key;
  }

  @HostListener('window:keyup')
  keyUp() {
    this.currPressed = 'None';
  }
}
