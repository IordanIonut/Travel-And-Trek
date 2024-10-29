package com.example.App_Dashbord.Generate;

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

    //    public static void main(String[] args) {
//        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
//        double latitude = coordinates[0];
//        double longitude = coordinates[1];
//
//        //String locationName = geocode(latitude, longitude);
//        //System.out.println("Location: " + locationName);
//        //fetchUnsplashImages(locationName);
//       // fetchPixabayVideos(locationName);
//    }

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

    public static void fetchUnsplashImages(String locationName) {
        String urlString = String.format("https://api.unsplash.com/search/photos?query=%s&client_id=%s", locationName, UNSPLASH_API_KEY);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(urlString).build();
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String jsonResponse = response.body().string();
                JsonObject jsonObject = JsonParser.parseString(jsonResponse).getAsJsonObject();
                JsonArray results = jsonObject.getAsJsonArray("results");

                // Print the URLs of the images
                for (int i = 0; i < results.size(); i++) {
                    JsonObject photo = results.get(i).getAsJsonObject();
                    String photoUrl = photo.get("urls").getAsJsonObject().get("regular").getAsString();
                    System.out.println("Image URL: " + photoUrl);
                }
            } else {
                System.out.println("Request failed: " + response.message());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void fetchPixabayVideos(String locationName) {
        String urlString = String.format("https://pixabay.com/api/videos/?key=%s&query=%s&per_page=30", PIXABAY_API_KEY, locationName);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(urlString).build();
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String jsonResponse = response.body().string();
                JsonObject jsonObject = JsonParser.parseString(jsonResponse).getAsJsonObject();
                JsonArray hits = jsonObject.getAsJsonArray("hits");
                for (int i = 0; i < hits.size(); i++) {
                    JsonObject video = hits.get(i).getAsJsonObject();
                    String videoUrl = video.get("videos").getAsJsonObject().get("large").getAsString();
                    System.out.println("Video URL: " + videoUrl);
                }
            } else {
                System.out.println("Request failed: " + response.message());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
