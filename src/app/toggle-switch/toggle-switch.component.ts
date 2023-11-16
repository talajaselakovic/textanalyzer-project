import { Component } from '@angular/core';
import { OnlineOfflineService } from '../services/online-offline.service';

/**
 * Component for a toggle switch to switch between online and offline analysis mode.
 * @author Talaja Selakovic
 *
 * @export
 * @class ToggleSwitchComponent
 */
@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css'],
})
export class ToggleSwitchComponent {
  /**
   * Indicates whether the application is in online mode or not, default "true".
   *
   * @type {boolean}
   */
  onlineMode: boolean = true;

  /**
   * Creates an instance of ToggleSwitchComponent.
   * @param {OnlineOfflineService} onlineOfflineService - Service for online and offline text analysis.
   */
  constructor(private onlineOfflineService: OnlineOfflineService) {}

  /**
   * Toggles the analysis mode between online and offline.
   */
  toggleAnalysisMode() {
    this.onlineOfflineService.toggleMode();
  }
}
