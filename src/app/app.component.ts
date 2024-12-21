import { Component } from '@angular/core';
import { ScreenOrientation } from '@capacitor/screen-orientation';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'palavrinha-game';

  async ngOnInit() {
    ScreenOrientation.lock({orientation: 'portrait'});
  }
}
