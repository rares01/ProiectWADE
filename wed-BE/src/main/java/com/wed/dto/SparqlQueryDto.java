package com.wed.dto;

import lombok.Builder;

@Builder
public record SparqlQueryDto (String query) { }
