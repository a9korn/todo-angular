import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  title = 'test title';
  text = 'Card description';

  img_link = 'https://reactjs.org/logo-og.png';

  obj = {
    body: {
      name: 'name',
      text: 'text',
    },
  };

  myFunc() {
    return 'ok ok ok ';
  }
}
