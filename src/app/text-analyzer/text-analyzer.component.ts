import { Component } from '@angular/core';
import { OnlineOfflineService } from '../services/online-offline.service';
import { Observable } from 'rxjs';

/**
 * Component for the text analysis.
 *
 * This component allows users to input text, choose an analysis type (vowels or consonants) and shows the results of the analysis.
 * @author Talaja Selakovic
 *
 * @export
 * @class TextAnalyzerComponent
 */
@Component({
  selector: 'app-text-analyzer',
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.css'],
})
export class TextAnalyzerComponent {
  /**
   * Creates an instance of TextAnalyzerComponent.
   * @param {OnlineOfflineService} onlineOfflineService - Service for online and offline text analysis.
   */
  constructor(private onlineOfflineService: OnlineOfflineService) {}

  /**
   * The input text from the user for the analysis.
   *
   * @type {string}
   */
  inputText: string = '';
  /**
   * Information string displayed when the input text is empty.
   *
   * @type {string}
   */
  helpSpan: string = '';
  /**
   * Array to store the analysis results.
   *
   * @type {string[]}
   */
  analysisResults: string[] = [];
  /**
   * The selected type of text analysis (vowels or consonants), default "vowels".
   *
   * @type {string}
   */
  selectedAnalysisType: string = 'vowels';

  /**
   * Calls the OnlineOfflineService for the text analysis based on user input and the selected analysis type.
   */
  analyzeText() {
    const input = this.inputText.toLowerCase();
    const analysisType = this.selectedAnalysisType; // Hier wird der ausgewählte Analysetyp verwendet
    const result$: Observable<string> = this.onlineOfflineService.analyzeText(
      input,
      analysisType
    );

    if (this.inputText === '') {
      // Help Span for when the input text is empty.
      this.helpSpan = 'Please enter a valid text to start the analysis!';
    } else {
      this.helpSpan = '';
      result$.subscribe((result) => {
        this.analysisResults.unshift(
          `In your analyzed text "${this.inputText}", ` + result
        );
        // Clearing the input field after the analysis is complete
        this.inputText = '';
      });
    }
  }
}
