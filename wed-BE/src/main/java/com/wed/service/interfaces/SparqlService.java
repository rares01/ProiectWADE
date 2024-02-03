package com.wed.service.interfaces;

import com.wed.dto.SparqlQueryDto;

public interface SparqlService {
    String query(SparqlQueryDto sparqlQueryDto);
}
