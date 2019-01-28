import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(public breakpointObserver: BreakpointObserver, public http: Http) {}

  title = '21 Cards Magic Trick';
  cards = [];

  ngOnInit() {
    this.detectaMedia();

    this.consomeApi();

  }

  detectaMedia() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log('Viewport is 500px or over!');
        }
        else {
          console.log('Viewport is getting smaller!');
        }
      });
  }

  consomeApi() {
    this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=21')
      .subscribe(res => {
        this.cards = res.json().cards;
      })
  }

  verCards() {
    console.log(this.cards);
  }
}
