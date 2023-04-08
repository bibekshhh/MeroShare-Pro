import pymongo
import os

try:
    client = pymongo.MongoClient("mongodb+srv://yaman1337:1337yaman@merosharepro-db.9i6mocr.mongodb.net/?retryWrites=true&w=majority")
    db = client["test"]
    collection = db["users"]

    email = input("Enter the email: ")
    password = input("Entet the password: ")

    existing_user = collection.find_one({"email": email})

    if existing_user:
        print("Email already exists in database.")
    else:

        user = {"email": email, "password": password}

        collection.insert_one(user)

        print("Email and password added to MongoDB!")
except:
    print("Something went wrong")
