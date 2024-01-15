package com.wed.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.model.*;
import org.apache.commons.lang3.StringUtils;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Configuration
@EnableDynamoDBRepositories(basePackages = "com.wed.repository",
        includeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Repository.class))
public class DynamoDBConfig {
    @Value("${amazon.dynamodb.endpoint}")
    private String amazonDynamoDBEndpoint;

    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;

    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;

    @Bean
    public AmazonDynamoDB amazonDynamoDB() {
        AmazonDynamoDB amazonDynamoDB
                = new AmazonDynamoDBClient(amazonAWSCredentials());

        if (!StringUtils.isEmpty(amazonDynamoDBEndpoint)) {
            amazonDynamoDB.setEndpoint(amazonDynamoDBEndpoint);
        }

        return amazonDynamoDB;
    }

    @Bean
    public AWSCredentials amazonAWSCredentials() {
        return new BasicAWSCredentials(
                amazonAWSAccessKey, amazonAWSSecretKey);
    }

    @Bean
    CommandLineRunner createDynamoDBTables(AmazonDynamoDB amazonDynamoDB) {
        return args -> {
            String tableName = "Customer";

            ListTablesResult listTablesResult = amazonDynamoDB.listTables();
            List<String> tableNames = listTablesResult.getTableNames();

            if (!tableNames.contains(tableName)) {
                CreateTableRequest request = new CreateTableRequest()
                        .withTableName(tableName)
                        .withKeySchema(new KeySchemaElement("CustomerID", KeyType.HASH)) // Partition key
                        .withAttributeDefinitions(
                                new AttributeDefinition("CustomerID", ScalarAttributeType.S) // String type attribute
                        )
                        .withProvisionedThroughput(new ProvisionedThroughput(5L, 5L)); // Read and write capacity

                amazonDynamoDB.createTable(request);
                System.out.println("Table 'customer' created successfully!");

            } else {
                System.out.println("Table 'customer' already exists.");
            }
        };
    }

}
