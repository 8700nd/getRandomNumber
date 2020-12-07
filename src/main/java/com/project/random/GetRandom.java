package com.project.random;

public class GetRandom {

    public double randomNum() {
        double min = 0.00000001;
        double max = 1;
        int exponent = 8;
        int power = (int) Math.pow(10, exponent);
        return Math.floor((Math.random() * (max - min) + min) * power) / power;
    }
}
