package com.wed.service.impl;

import com.wed.dto.SparqlQueryDto;
import com.wed.service.interfaces.SparqlService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Slf4j
public class SparqlServiceImpl implements SparqlService {
    @Value("${NEPTUNE_ENDPOINT:dummy}")
    private String neptuneEndpoint;

    @Override
    public String query(SparqlQueryDto sparqlQueryDto) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        headers.add("Accept", "text/csv");

        String payload = "query=" + sparqlQueryDto.query().replace("\n", "");
        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(neptuneEndpoint + "/sparql", request, String.class);

        return response.getBody();
    }

    @Override
    public String queryFiltered(List<String> filters) {
        final String queryOpening = "SELECT ?subject ?predicate ?object WHERE {?subject ?predicate ?object .";
        final String filterOpening = "FILTER (";
        final String containsStatement = "CONTAINS(LCASE(str(?object)), LCASE(\"%s\"))";

        StringBuilder query = new StringBuilder(queryOpening);

        if (ObjectUtils.isEmpty(filters)) {
            query.append("}");
        } else {
            query.append(filterOpening);
            query.append(String.format(containsStatement, filters.get(0)));
            for (String filter : filters.subList(1, filters.size())) {
                query.append(" || ");
                query.append(String.format(containsStatement, filter));
            }
            query.append(")}");
        }

        log.info("filtered query={}", query);

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        headers.add("Accept", "text/csv");

        String payload = "query=" + query;
        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(neptuneEndpoint + "/sparql", request, String.class);

        return response.getBody();
    }
}
