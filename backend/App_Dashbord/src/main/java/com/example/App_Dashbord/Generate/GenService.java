package com.example.App_Dashbord.Generate;

import com.example.App_Dashbord.Service.FollowerService;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;  // For caching
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class GenService {
    @Autowired
    private LocationMediaSearch locationMediaSearch;
    @Autowired
    private static final Logger LOG = LoggerFactory.getLogger(FollowerService.class);

    public Optional<Map<String, Object>> getGeoCode() {
        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
        double latitude = coordinates[0];
        double longitude = coordinates[1];

        JsonObject geoData = locationMediaSearch.geocode(latitude, longitude);

        if (geoData != null && geoData.get("results").isJsonArray()) {
            JsonArray resultsArray = geoData.getAsJsonArray("results");
            if (resultsArray.size() > 0) {
                JsonObject firstResult = resultsArray.get(0).getAsJsonObject();
                Map<String, Object> map = new Gson().fromJson(firstResult, new TypeToken<Map<String, Object>>() {
                }.getType());
                return Optional.of(map);
            }
        } else {
            LOG.warn("getGeoCode() - No results found in geocode data or geoData is null.");
        }
        return Optional.empty();
    }

    public Optional<String> getGeoCodeFormatted() {
        double[] coordinates = GenLatLot.generateRandomLandCoordinates();
        double latitude = coordinates[0];
        double longitude = coordinates[1];

        JsonObject geoData = locationMediaSearch.geocode(latitude, longitude);

        if (geoData != null && geoData.get("results").isJsonArray()) {
            JsonArray resultsArray = geoData.getAsJsonArray("results");
            if (resultsArray.size() > 0) {
                JsonObject firstResult = resultsArray.get(0).getAsJsonObject();
                String formattedAddress = firstResult.get("formatted").getAsString();
                return Optional.of(formattedAddress);
            }
        } else {
            LOG.warn("getGeoCodeFormatted() - No results found in geocode data or geoData is null.");
        }
        return Optional.empty();
    }
}