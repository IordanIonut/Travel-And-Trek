package com.example.App_Dashbord.Generate;

import java.util.Random;

public class GenLatLot {

    public static void main(String[] args) {
        double[] coordinates = generateRandomLandCoordinates();
        System.out.println("Random Latitude: " + coordinates[0]);
        System.out.println("Random Longitude: " + coordinates[1]);
    }
    private static double[][] landRegions = {
            {24.396308, 49.384358, -125.0, -66.93457},
            {35.0, 71.0, -10.0, 40.0},
            {-56.0, 13.0, -81.0, -35.0},
            {-44.0, -10.0, 112.0, 154.0},
            {-35.0, 37.0, -17.0, 51.0},
            {8.0, 37.0, 68.0, 97.0}
    };
    public static double[] generateRandomLandCoordinates() {
        Random random = new Random();
        int regionIndex = random.nextInt(landRegions.length);
        double[] region = landRegions[regionIndex];
        double randomLatitude = region[0] + (region[1] - region[0]) * random.nextDouble();
        double randomLongitude = region[2] + (region[3] - region[2]) * random.nextDouble();
        return new double[]{randomLatitude, randomLongitude};
    }
}
