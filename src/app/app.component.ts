import { Component } from '@angular/core';

/**
 * Root component of the Text Analyzer application.
 * @author Talaja Selakovic
 *
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   * The title of the Text Analyzer application.
   *
   * @type {string}
   */
  title = 'textanalyzer-project';
}
