import { Component } from '@angular/core';
import * as te from "tw-elements";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FAMSFOOD';

  ngOnInit() {
    const importTE = async () => {
      await import('tw-elements');
    };
    importTE();

    // const options = {
    //   format: "dd-mm-yyyy",
    // };
    // const myDatepicker = new te.Datepicker(
    //   document.getElementById("myDatepicker"),
    //   options
    // );
  }
}
