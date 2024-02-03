package com.wed.util;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.wed.entity.Preferences;

import java.util.List;
import java.util.stream.Collectors;

public class PreferencesConverter implements DynamoDBTypeConverter<List<String>, List<Preferences>> {
    @Override
    public List<String> convert(List<Preferences> preferences) {
        return preferences.stream().map(Enum::name).collect(Collectors.toList());
    }

    @Override
    public List<Preferences> unconvert(List<String> strings) {
        return strings.stream().map(Preferences::valueOf).collect(Collectors.toList());
    }
}
