import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(
    public wbSocket: WebSocketService
  ) { }

  ngOnInit() {
  }

}
