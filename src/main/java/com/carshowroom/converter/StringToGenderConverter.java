package com.carshowroom.converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.carshowroom.entity.Gender;
import com.carshowroom.repository.GenderRepository;

@Component
public class StringToGenderConverter implements Converter<String, Gender> {

    @Autowired
    private GenderRepository genderRepository;

    @Override
    public Gender convert(String source) {
        if (source == null || source.isEmpty()) return null;
        return genderRepository.findById(Integer.parseInt(source)).orElse(null);
    }
}