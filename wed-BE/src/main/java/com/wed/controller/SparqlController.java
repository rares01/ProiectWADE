package com.wed.controller;

import com.wed.dto.SparqlQueryDto;
import com.wed.service.interfaces.SparqlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("sparql")
public class SparqlController {
    @Autowired
    private SparqlService sparqlService;

    @PostMapping(produces = "text/csv")
    public ResponseEntity<?> query(@RequestBody SparqlQueryDto sparqlQueryDto) {
        return ResponseEntity.ok(sparqlService.query(sparqlQueryDto));
    }

    @PostMapping(path = "/filter", produces = "text/csv")
    public ResponseEntity<?> queryFiltered(@RequestBody List<String> filters) {
        return ResponseEntity.ok(sparqlService.queryFiltered(filters));
    }
}
