import json
from rdflib.graph import Graph
import boto3
import os
import uuid
from datetime import datetime
import logging

logger = logging.getLogger()
logger.setLevel("INFO")
s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = os.environ['bucket_name']
    folder_name = os.environ.get('s3_folder', 
datetime.today().strftime('%Y-%m-%d'))
    
    crawled_triples = 0
    
    for record in event['Records']:
        try:
            file_name = str(uuid.uuid4())
            url = json.loads(record['body'])['Url']
            
            logger.info("Crawling %s", url)
    
            g = Graph()
            g.parse(url, format='rdfa')
            rdf = g.serialize(format="xml")
        
            s3.put_object(Bucket=bucket_name, 
Key=f'{folder_name}/{file_name}', Body=rdf)
            
            crawled_triples += len(g)
            
            logger.info("Crawled %d triples and saved to file %s", len(g), 
file_name)
        except:
            logger.exception("Error processing record %s", record)

    return {
        'statusCode': 200,
        'body': json.dumps(crawled_triples)
    }

