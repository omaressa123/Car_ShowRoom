package com.carshowroom.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.carshowroom.entity.City;
import com.carshowroom.repository.CityRepository;

@Component
public class StringToCityConverter implements Converter<String, City> {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public City convert(String source) {
        return cityRepository.findById(Integer.parseInt(source)).orElse(null);
    }
}