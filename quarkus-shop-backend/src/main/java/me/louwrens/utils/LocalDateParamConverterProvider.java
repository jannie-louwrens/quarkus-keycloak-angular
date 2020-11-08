package me.louwrens.utils;

import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import javax.ws.rs.ext.Provider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.time.LocalDate;

@Provider
public class LocalDateParamConverterProvider implements ParamConverterProvider {
 
    @Override
    public <T> ParamConverter<T> getConverter(Class<T> rawType, Type genericType,
            Annotation[] annotations) {
        if (rawType.equals(LocalDate.class)) {
            return (ParamConverter<T>) new ParamConverter<LocalDate>() {
                @Override
                public LocalDate fromString(String value) {
                    return value == null ? null : LocalDate.parse(value);
                }

                @Override
                public String toString(LocalDate value) {
                    return value == null ? null : value.toString();
                }
            };
        }
        return null;
    }
 
}