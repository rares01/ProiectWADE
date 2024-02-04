package com.wed.service.impl;

import com.wed.dto.SparqlQueryDto;
import com.wed.service.interfaces.SparqlService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SparqlServiceImpl implements SparqlService {
    @Value("${NEPTUNE_ENDPOINT:dummy}")
    private String neptuneEndpoint;

    @Override
    public String query(SparqlQueryDto sparqlQueryDto) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        headers.add("Accept", "text/csv");

        String payload = "query=" + sparqlQueryDto.query();
        HttpEntity<String> request = new HttpEntity<>(payload, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(neptuneEndpoint + "/sparql", request, String.class);

        return response.getBody();
    }
}
