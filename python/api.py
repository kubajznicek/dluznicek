from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
import json
import Constants


currenciesURL = Constants.currenciesURL
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

def debts():
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    for person in file_data["isowed"]:
        if file_data["ows"][person] > 0:
            if file_data["isowed"][person] > 0:
                still_ows = file_data["ows"][person] - file_data["isowed"][person]
                if still_ows < 0:
                    still_ows = 0
                no_debt_now = file_data["ows"][person] - still_ows
                file_data["ows"][person] -= no_debt_now
                file_data["isowed"][person] -= no_debt_now

    ows = sorted(file_data["ows"].items(), key=lambda x:x[1], reverse=True)
    isowed = sorted(file_data["isowed"].items(), key=lambda x:x[1], reverse=True)
    ows = dict((x, y) for x, y in ows)
    isowed = dict((x, y) for x, y in isowed)


    debts = []
    for person in ows:
        if ows[person] > 0:
            for j in isowed:
                if isowed[j] > 0:
                    if ows[person] > isowed[j]:
                        debts.append({"who": person, "whom": j, "amount": isowed[j]})
                        ows[person] -= isowed[j]
                        isowed[j] -= isowed[j]
                        if ows[person] == 0:
                            break
                    else:   # ows je mensi ne isowed -> cely ows se da do isowed
                        debts.append({"who": person, "whom": j, "amount": ows[person]})
                        isowed[j] -= ows[person]
                        break

    file_data["debts"] = debts


    with open('data.json', 'w') as f:
        json.dump(file_data, f, indent = 4)


def ows(whoPaid, whomPaid):
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    isowed = 0
    for i in whomPaid:
        isowed += int(i[1])

    for i in whomPaid:
        file_data["ows"][i[0]] += int(i[1])

    file_data["isowed"][whoPaid] += isowed

    with open('data.json', 'w') as f:
        json.dump(file_data, f, indent = 4)

@app.get("/")
async def getRoot():
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
    ows(payment.whoPaid, payment.whomPaid)

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
    
    debts()
    with open('data.json', 'r') as f:
        file_data = json.load(f)
    response = {'isowed': file_data["isowed"], 'ows':  file_data["ows"], 'debts': file_data["debts"]}

    return response

@app.get("/debts")
async def getDebts():
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    debts()
    with open('data.json', 'r') as f:
        file_data = json.load(f)
    response = {'isowed': file_data["isowed"], 'ows':  file_data["ows"], 'debts': file_data["debts"]}

    return response

@app.delete("/debts")
async def removeDebts():
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    file_data["debts"] = []
    for i in file_data["ows"]:
        file_data["ows"][i] = 0

    for i in file_data["isowed"]:
        file_data["isowed"][i] = 0
    
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

    with open("data.json",'r+') as f:
        file_data = json.load(f)
        file_data["isowed"].update({person.person: 0})
        f.seek(0)
        json.dump(file_data, f, indent = 4)

    with open("data.json",'r+') as f:
        file_data = json.load(f)
        file_data["ows"].update({person.person: 0})
        f.seek(0)
        json.dump(file_data, f, indent = 4)

@app.delete("/people")
async def removePerson(person: Person):
    with open('data.json', 'r') as f:
        file_data = json.load(f)

    file_data['people'].remove(person.person)
    file_data['isowed'].pop(person.person)
    file_data['ows'].pop(person.person)
    with open('data.json', 'w') as f:
        json.dump(file_data, f, indent = 4)