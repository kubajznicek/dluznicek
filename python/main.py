from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
import json



currenciesURL = "https://api.freecurrencyapi.com/v1/latest?apikey=Wib0th11koEsrquO1UQVwrxdAOGrGNlduhQHMcvc&base_currency=CZK&currencies=EUR%2CUSD"
app = FastAPI()

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"]
)

class Payment(BaseModel):
    whoPaid: str
    amount: int
    purpose: str
    date: str
    whomPaid: list

class Person(BaseModel):
    person: str


@app.get("/")
async def pokus():
    return {"message": "Hello World"}

@app.get("/currencies")
async def getValue():
    resp = requests.get(currenciesURL)
    json = resp.json()
    return {"eur" : round(1/json['data']['EUR'],4),
            "usd" : round(1/json['data']['USD'],4)}

@app.get("/payments")
async def getPayments():
    with open('data.json', 'r') as f:
        file_data = json.load(f)
        return file_data["payments"]
    
@app.put("/payments")
async def newPayment(payment: Payment ):
    print(payment)

    with open('data.json', 'r') as f:
        file_data = json.load(f)

    new_payment = {
        "whoPaid": payment.whoPaid,
        "amount": payment.amount,
        "purpose": payment.purpose,
        "date": payment.date,
        "whomPaid": payment.whomPaid
    }
    file_data["payments"].append(new_payment)

    with open('data.json', 'w') as f:
        json.dump(file_data, f, indent = 4)

@app.get("/people")
async def getPeople():
    with open('data.json', 'r') as f:
        file_data = json.load(f)
        return file_data["people"]

@app.put("/people")
async def addPerson(person: Person):
    with open("data.json",'r+') as f:
        file_data = json.load(f)
        file_data["people"].append(person.person)
        f.seek(0)
        json.dump(file_data, f, indent = 4)

@app.delete("/people")
async def removePerson(person: Person):
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    file_data['people'].remove(person.person)
    with open('data.json', 'w') as f:
        json.dump(file_data, f, indent = 4)