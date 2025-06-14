package com.example.App.Generate;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api")
public class LanguageDetectionController {

    private static final String RAPIDAPI_URL = "https://text-language-by-api-ninjas.p.rapidapi.com/v1/textlanguage";

    private static final String RAPIDAPI_KEY = "14ce7d2fcfmsh80dc245e906e431p10efbdjsn558add0c89e3";
    private static final String RAPIDAPI_HOST = "text-language-by-api-ninjas.p.rapidapi.com";

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/detect-language")
    public ResponseEntity<String> detectLanguage(@RequestParam String text) {
        // Build URL with query param
        String url = UriComponentsBuilder.fromHttpUrl(RAPIDAPI_URL)
                .queryParam("text", text)
                .toUriString();

        // Setup headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", RAPIDAPI_KEY);
        headers.set("x-rapidapi-host", RAPIDAPI_HOST);
        headers.setAccept(MediaType.parseMediaTypes("application/json"));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        // Call RapidAPI
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
}