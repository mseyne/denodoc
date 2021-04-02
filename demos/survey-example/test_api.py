import requests

## USERS :
# GET get users | all users 
# GET get users <id> get one user 
# POST users | add one user 
# PUT users <id> | update user 
# DELETE users <id> | delete user 
## POSTS :
# REGISTER
# LOGIN

API_NAME = 'SURVEY_APP'

url = 'http://localhost'
port = '5050'
path = url+':'+port+'/api/'
query = ''
data = {}

def get_data():
    global data
    name = ''
    if query is "register":
        name = input("What is the user name? ")
    email = input("What is the user email? ")
    password = input("What is the user password? ")
    data = {
        "name":name,
        "email":email,
        "password":password
    }

def post():
    get_data()
    result = requests.post(path+query,json=data)
    display_result(result)

def get(nid):
    query = 'users'
    r = requests.get(path+query)
    if id is not None:
        r = requests.get(path+query+'/'+nid)

def display_result(r):
    print(r)
    print(r.headers)
    print(r.json())

def start():
    global query
    print(f'\nTesting API for the {API_NAME}.')
    print("1. REGISTER a new user")
    print("2. LOGIN a user")
    print()
    result = input('Choose an option: ')
    command = ''
    if result in ["1", "2"]:
        result = int(result)
        if result == 1:
            command = "post"
            query = "register"
        if result == 2:
            command = "post"
            query = "login"
    else:
        print('The options are 1 or 2')

    if command == 'post':
        post()
    elif command == 'get':
        get(nid)

if __name__ == '__main__':
    start()
