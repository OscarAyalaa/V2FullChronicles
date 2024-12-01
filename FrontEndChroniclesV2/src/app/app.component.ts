import { Component, OnInit } from '@angular/core';
import { MultimediaService } from './services/multimedia/multimedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'FrontEndChroniclesV2';
  actualUrl: String;

  constructor(private multiService: MultimediaService) {}

  ngOnInit(): void {
    this.actualUrl = document.URL;
  }

}
