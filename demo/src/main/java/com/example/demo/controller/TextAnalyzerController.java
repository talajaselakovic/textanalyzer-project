package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.TextAnalyzerService;
import java.util.Map;

/**
 * Controller class with RESTful API for handling online text analysis requests.
 * 
 * @author Talaja Selakovic
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/text-analyzer")
public class TextAnalyzerController {

    @Autowired
    private TextAnalyzerService textAnalyzerService;

    /**
     * POST Method that handles the online text analysis requests based on the
     * requested analysis type.
     *
     * @param analysisType The specific type of analysis requested (can be "vowels"
     *                     or "consonants").
     * @param request      The input text that needs to be analyzed.
     * @return ResponseEntity containing the analysis results as a map of characters
     *         (the letters) to their counts (how often they appear in the text).
     */
    @PostMapping("/analyze/{analysisType}")
    public ResponseEntity<Map<Character, Integer>> analyzeText(
            @PathVariable String analysisType,
            @RequestBody Map<String, String> request) {
        String input = request.get("text");

        // Analyzing the text using the TextAnalyzerService
        Map<Character, Integer> result = textAnalyzerService.analyzeText(input, analysisType);

        // The result of the analysis gets returned as a ResponseEntity
        return ResponseEntity.ok(result);
    }
}
