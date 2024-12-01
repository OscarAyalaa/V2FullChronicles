package com.soa.query;

public class MultimediaQuery {
    public static final String COUNT_MULTIMEDIA_REGISTER_QUERY = "SELECT COUNT(*) FROM multimedia WHERE (titulo like :titulo and anio like :anio and direccion like :director)";
}
