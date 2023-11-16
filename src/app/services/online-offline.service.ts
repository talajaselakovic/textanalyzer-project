import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
/**
 * Service for handling text analysis in online and offline mode.
 * @author Talaja Selakovic
 *
 * @class
 * @export
 * @Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class OnlineOfflineService {
  /**
   * Flag indicating whether the service is in online mode.
   *
   * @type {boolean}
   */
  onlineMode: boolean = true;

  /**
   * Constructs an instance of the OnlineOfflineService.
   *
   * @constructor
   * @param {HttpClient} http - The Angular HttpClient.
   */
  constructor(private http: HttpClient) {}

  /**
   * Analyzes the input text based on the requested analysis type.
   *
   * @param {string} input - The input text to be analyzed..
   * @param {string} analysisType - The type of analysis to perform ("vowels" or "consonants").
   * @returns {Observable<string>} An observable with the analysis results.
   */
  analyzeText(input: string, analysisType: string): Observable<string> {
    // Online analysis
    if (this.onlineMode) {
      // Changes the endpoint based on the requested analysis type
      const endpoint = analysisType === 'vowels' ? 'vowels' : 'consonants';

      return this.http
        .post<any>(
          `http://localhost:8080/api/text-analyzer/analyze/${endpoint}`,
          {
            text: input,
          }
        )
        .pipe(
          map((response) => {
            const counts = response;

            const resultString = Object.keys(counts)
              .map(
                (key) =>
                  `the letter '${key.toUpperCase()}' appears ${
                    counts[key]
                  } times`
              )
              .join(', ');

            return resultString;
          })
        );
    } else {
      // Offline analysis
      const vowelCounts = {};
      const consonantCounts = {};

      const allVowels = ['A', 'E', 'I', 'O', 'U'];
      const allConsonants = 'BCDFGHJKLMNPQRSTVWXYZ';

      for (let i = 0; i < input.length; i++) {
        const char = input[i].toUpperCase();

        if (allVowels.includes(char)) {
          vowelCounts[char.toLowerCase()] =
            (vowelCounts[char.toLowerCase()] || 0) + 1;
        } else if (allConsonants.includes(char)) {
          consonantCounts[char] = (consonantCounts[char] || 0) + 1;
        }
      }

      let resultString = '';
      // Analysis of the vowels
      if (analysisType === 'vowels') {
        resultString = allVowels
          .map((vowel) => {
            const count = vowelCounts[vowel.toLowerCase()] || 0;
            return `the letter '${vowel}' appears ${count} times`;
          })
          .join(', ');
      }
      // Analysis of the consonants
      else if (analysisType === 'consonants') {
        resultString = Object.entries(consonantCounts)
          .sort(([consonantA], [consonantB]) =>
            consonantA.localeCompare(consonantB)
          )
          .map(([consonant, count]) => {
            return `the letter '${consonant}' appears ${count} times`;
          })
          .join(', ');
      }

      return new Observable<string>((observer) => {
        observer.next(resultString);
        observer.complete();
      });
    }
  }

  /**
   * Changing with toggle switch between online and offline mode.
   */
  toggleMode() {
    this.onlineMode = !this.onlineMode;
  }
}
