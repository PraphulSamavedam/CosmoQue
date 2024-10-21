import requests
from requests.auth import HTTPBasicAuth
from fastapi import FastAPI, HTTPException
import pandas as pd
from pydantic import BaseModel
import json


app = FastAPI()

class CustomerDetails(BaseModel):
    first_name: str
    last_name: str
    email: str
    birthdate: str
    ssn_last_four: str

class JiraIssue(BaseModel):
    summary: str
    description: str
    # project_key: str

# Initialize variables to hold the data
df: pd.DataFrame = None
customer_dict: dict = None
URL = None # "https://gowreesh-gvss.atlassian.net/rest/api/2/issue"
PROJECT_KEY = None # "FF"

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/get_customer_details/{phone}", response_model=CustomerDetails)
def get_customer_details(phone: int) -> CustomerDetails:
    """
    Get the customer details for a given phone number
    """
    if phone not in customer_dict:
        return CustomerDetails(
            first_name="New Customer",
            last_name="New Customer",
            email="",
            birthdate="",
            ssn_last_four=""
        )
        # raise HTTPException(status_code=404, detail="Customer not found")
    
    customer_data = customer_dict[phone]
    
    return CustomerDetails(
        first_name=customer_data['first_name'],
        last_name=customer_data['last_name'],
        email=customer_data['email'],
        birthdate=customer_data['birthdate'],
        ssn_last_four=int(str(customer_data['ssn'])[-4:])
    )


@app.post("/create_jira_issue/")
def create_jira_issue(jira_issue: JiraIssue):
    """
    Create a new Jira issue with the provided details
    """
    print(f"Jira issue: {jira_issue}")
    auth = HTTPBasicAuth("<email>", 
                         "<token>")
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }

    # Payload with dynamic parameters
    payload = json.dumps({
        "fields": {
            "project": {
                "key": PROJECT_KEY  
            },
            "summary": jira_issue.summary,  # Takes summary as parameter
            "description": jira_issue.description,  # Takes description as parameter
            "issuetype": { 
                "name": "Task"  # You can make this dynamic if needed
            }
        }
    })

    # Send the POST request to Jira API
    response = requests.post(
        url=URL,
        data=payload,
        headers=headers,
        auth=auth
    )

    return response.json()
 
    # # Print response status and the returned issue details, if created
    # if response.status_code == 201:
    #     print("Issue created successfully.")
    #     print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))
    # else:
    #     print(f"Failed to create issue. Status code: {response.status_code}")
    #     print(response.text)
 

@app.on_event("startup")
def startup_event():
    global df, customer_dict, URL, PROJECT_KEY
    df = pd.read_parquet("../data/user_database.parquet")
    URL = "https://gowreesh-gvss.atlassian.net/rest/api/2/issue"
    PROJECT_KEY = "FF"
    # print(df.head())
    customer_dict = df.set_index('phone').to_dict('index')