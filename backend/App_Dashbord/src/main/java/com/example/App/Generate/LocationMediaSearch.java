package com.example.App.Generate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

@Component
public class LocationMediaSearch {
    private static final String OPENCAGE_API_KEY = "79933bbb5034424bad659f9e06829702";
    private static final String UNSPLASH_API_KEY = "duEcheMS4D8ACro9BV7n97oUggd6Yc8jFXt87fekr8Q";
    private static final String PIXABAY_API_KEY = "rTas8YOUDxP5LU27cDt9Met2gGngApbsNUDZR3a2PgN0XZmbr3jYcTDh";

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
}
