import os
from neo4j import GraphDatabase
from dotenv import load_dotenv


load_dotenv()

# uri = os.environ.get('NEO4J_URI')
# username = os.environ.get('NEO4J_USERNAME')
# password = os.environ.get('NEO4J_PASSWORD')


#BD1
uri = "neo4j+ssc://3a4688e0.databases.neo4j.io"
username = "neo4j"
password = "huy7L9aCvK3qoU9Tfw_do5E_eP1ZzcEbxKHiuPc9ERQ"

# #BD2s
# uri = "neo4j+s://93bfee48.databases.neo4j.io"
# username = "neo4j"
# password = "cqwaOsXzVerQkMIfacqY_pscq68KBUH7ZSlissJWv1w"


try:
    driver = GraphDatabase.driver(uri, auth=(username, password))
    print("Connection successful!")
except Exception as e:
    print("An error occurred while connecting to Neo4j:")
    print(str(e))
