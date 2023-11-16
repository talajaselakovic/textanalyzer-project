package com.example.demo.service;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Service class for the online analysis for analyzing the input text and
 * counting the number of vowels or consonants.
 * 
 * @author Talaja Selakovic
 */
@Service
public class TextAnalyzerService {
    // Sorting the vowels alphabetically
    private final List<Character> vowelOrder = Arrays.asList('A', 'E', 'I', 'O', 'U');

    /**
     * Method that analyzes the input text based on the requested analysis type.
     *
     * @param input        The input text to be analyzed.
     * @param analysisType The type of analysis to perform ("vowels" or
     *                     "consonants").
     * @return A map containing characters (the letters) as keys and their counts
     *         (how often they appear in the text) as values.
     */
    public Map<Character, Integer> analyzeText(String input, String analysisType) {
        // LinkedHashMap keeps the order of insertion
        Map<Character, Integer> result = new LinkedHashMap<>();
        String lowercaseInput = input.toLowerCase();

        // Analysis of the vowels
        if ("vowels".equals(analysisType)) {
            // Initialising the vowels with 0
            vowelOrder.forEach(vowel -> result.put(vowel, 0));

            // Counting the vowels in the text
            for (char c : input.toUpperCase().toCharArray()) {
                if (isVowel(c)) {
                    result.put(c, result.get(c) + 1);
                }
            }

        }
        // Analysis of the consonants
        else if ("consonants".equals(analysisType)) {
            // Using TreeMap to sort the consonants alphabetically
            Map<Character, Integer> consonantMap = new TreeMap<>();

            // Counting the consonants in the text
            for (char c : lowercaseInput.toCharArray()) {
                if (!isVowel(c)) {
                    consonantMap.put(c, consonantMap.getOrDefault(c, 0) + 1);
                }
            }
            result.putAll(consonantMap);
        }
        return result;
    }

    /**
     * Checks whether a character is a vowel.
     *
     * @param c The character to be checked.
     * @return true if the character is a vowel, otherwise false.
     */
    private boolean isVowel(char c) {
        return "aeiouAEIOU".indexOf(c) != -1;
    }

}