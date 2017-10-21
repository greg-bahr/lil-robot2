import {AfterViewInit, Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements AfterViewInit {

  private player: any;
  @ViewChild('player') canvas;

  ngAfterViewInit() {
    this.player = new JSMpeg.Player('ws://127.0.0.1:3002', { canvas: this.canvas.nativeElement });
  }
}
