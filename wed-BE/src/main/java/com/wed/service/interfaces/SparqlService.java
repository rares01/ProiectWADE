package com.wed.service.interfaces;

import com.wed.dto.SparqlQueryDto;

import java.util.List;

public interface SparqlService {
    String query(SparqlQueryDto sparqlQueryDto);

    String queryFiltered(List<String> filters);
}
