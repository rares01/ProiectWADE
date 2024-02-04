import json
import os
from bs4 import BeautifulSoup
import urllib.request
import logging
import boto3

logger = logging.getLogger()
logger.setLevel("INFO")

sqs = boto3.client('sqs')

def lambda_handler(event, context):
    start_url = event.get('start_url')
    base_url = 'https://developer.mozilla.org'
    queue_url = os.environ['queue_url']
    
    if start_url is None:
        return {
            'statusCode': 400,
            'body': 'start_url is required'
        }
    
    limit = int(os.environ.get('limit', 10))
    urls = set()
    
    logger.info("Crawling %s with limit of %d", start_url, limit)
    
    resp = urllib.request.urlopen(start_url)
    soup = BeautifulSoup(resp, 'html.parser', 
from_encoding=resp.info().get_param('charset'))

    for link in soup.find_all('a', href=True):
        ref = link['href']
        
        if not ref.startswith('/en-US/docs'):  
            continue
        
        urls.add(base_url + ref)
    
    logger.info("Finished crawling, found %d urls", len(urls))
    
    urls = list(urls)
    if limit >= 0:
        urls = urls[:limit]
    
    for url in urls:
        sqs.send_message(
            QueueUrl=queue_url, 
            MessageBody=json.dumps({'Source': 'MDN', 'Url': url})
        )
    
    return {
        'statusCode': 200,
        'body': json.dumps(len(urls))
    }

