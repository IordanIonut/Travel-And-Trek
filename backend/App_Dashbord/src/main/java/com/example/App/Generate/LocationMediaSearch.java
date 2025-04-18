package com.example.App.Generate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.util.Random;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONArray;
import org.json.JSONObject;

@Component
public class LocationMediaSearch {
    private static final String OPENCAGE_API_KEY = "79933bbb5034424bad659f9e06829702";
    private static final String UNSPLASH_API_KEY = "duEcheMS4D8ACro9BV7n97oUggd6Yc8jFXt87fekr8Q";
    private static final String PIXABAY_API_KEY = "rTas8YOUDxP5LU27cDt9Met2gGngApbsNUDZR3a2PgN0XZmbr3jYcTDh";
    private static final  String PIXABAY_VIDEO_API_KEY = "49716600-fea12d8007a6716ad08953f28";
    private static final int MAX = 150;


    public JsonObject geocode(double latitude, double longitude) {
        String urlString = String.format("https://api.opencagedata.com/geocode/v1/json?q=%f+%f&key=%s", latitude, longitude, OPENCAGE_API_KEY);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(urlString).build();
        try (Response response = client.newCall(request).execute()) {
            String jsonResponse = response.body() != null ? response.body().string() : "No response body";
            if (response.isSuccessful()) {
                JsonObject jsonObject = JsonParser.parseString(jsonResponse).getAsJsonObject();
                JsonArray results = jsonObject.getAsJsonArray("results");
                if (results.size() > 0) {
                    return jsonObject;
                } else {
                    JsonObject errorResponse = new JsonObject();
                    errorResponse.addProperty("error", "No results found for the given coordinates.");
                    return errorResponse;
                }
            } else {
                JsonObject errorResponse = new JsonObject();
                errorResponse.addProperty("error", "OpenCage API error: " + jsonResponse);
                return errorResponse;
            }
        } catch (Exception e) {
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("error", "An unexpected error occurred: " + e.getMessage());
            return errorResponse;
        }
    }

    public static JsonObject fetchPixabayPhotos(String locationName) {
        String urlString = String.format("https://api.pexels.com/v1/search?&query=%s&per_page=30", locationName);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(urlString).addHeader("Authorization", PIXABAY_API_KEY).build();
        try (Response response = client.newCall(request).execute()) {
            String jsonResponse = response.body() != null ? response.body().string() : "No response body";
            if (response.isSuccessful()) {
                JsonObject jsonObject = JsonParser.parseString(jsonResponse).getAsJsonObject();
                JsonArray results = jsonObject.getAsJsonArray("photos");
                if (results.size() > 0) {
                    return jsonObject;
                } else {
                    JsonObject errorResponse = new JsonObject();
                    errorResponse.addProperty("error", "No results found for the given coordinates.");
                    return errorResponse;
                }
            } else {
                JsonObject errorResponse = new JsonObject();
                errorResponse.addProperty("error", "OpenCage API error: " + jsonResponse);
                return errorResponse;
            }
        } catch (Exception e) {
            JsonObject errorResponse = new JsonObject();
            errorResponse.addProperty("error", "An unexpected error occurred: " + e.getMessage());
            return errorResponse;
        }
    }


//    public static void main(String[] args) {
//        try {
//            String videoUrl = fetchRandomPixabayVideoUrl();
//            System.out.println("Random Video URL: " + videoUrl);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    public static String fetchRandomPixabayVideoUrl() throws IOException, InterruptedException {
        final int MAX_RETRIES = 3;
        final int RETRY_DELAY_MS = 5000; // 2 seconds

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            int randomPage = new Random().nextInt(MAX) + 1;
            String uri = String.format(
                    "https://pixabay.com/api/videos/?key=%s&per_page=3&page=%d&safesearch=true",
                    PIXABAY_VIDEO_API_KEY, randomPage
            );

            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(uri))
                    .GET()
                    .build();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            JSONObject json;
            try {
                json = new JSONObject(response.body());
            } catch (org.json.JSONException e) {
                System.err.println("JSON parsing failed. Attempt " + attempt + ": " + e.getMessage());
                Thread.sleep(RETRY_DELAY_MS); // wait before retrying
                continue;
            }

            if (!json.has("hits")) {
                System.err.println("No 'hits' field found in response. Attempt " + attempt);
                Thread.sleep(RETRY_DELAY_MS);
                continue;
            }

            JSONArray hits = json.getJSONArray("hits");

            if (hits.length() > 0) {
                int randomIndex = new Random().nextInt(hits.length());
                JSONObject video = hits.getJSONObject(randomIndex);
                JSONObject videos = video.getJSONObject("videos");
                JSONObject medium = videos.getJSONObject("medium");

                return medium.getString("url");
            } else {
                System.err.println("Empty 'hits' array. Attempt " + attempt);
                Thread.sleep(RETRY_DELAY_MS);
            }
        }

        return "Failed to fetch video after several attempts.";
    }

}
