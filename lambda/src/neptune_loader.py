import json
from datetime import datetime
import os
import requests

def lambda_handler(event, context):
  s3_bucket = os.environ['s3_bucket']
  s3_folder = event.get('s3_folder', 
datetime.today().strftime('%Y-%m-%d'))
  url = f"{os.environ['neptune_endpoint']}/loader"

  print('Starting import from ' + s3_folder)

  payload = {
    "source": f"s3://{s3_bucket}/{s3_folder}",
    "format": "rdfxml", 
    "iamRoleArn": os.environ['iam_role'],
    "region": "eu-west-1",
    "failOnError": "FALSE",
    "parallelism": "MEDIUM",  
    "updateSingleCardinalityProperties": "FALSE",
    "queueRequest": "TRUE"
  }

  headers = {"Content-Type": "application/json"}

  response = requests.post(url, data=json.dumps(payload), headers=headers)

  print("Import job started with response: " + response.text)

  return {
    'statusCode': 200
  }

