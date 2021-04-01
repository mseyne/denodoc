import requests
import sys

## USERS :
# GET get users | all users 
# GET get users <id> get one user 
# POST users | add one user 
# PUT users <id> | update user 
# DELETE users <id> | delete user 
## POSTS :

url = 'http://localhost'
port = '5050'
path = url+':'+port+'/api/'

data = {
    "name":"test2",
    "email":"test2@example.com",
    "password":"test2"
}

def post():
    query = 'register'
    r = requests.post(path+query,json=data)
    print(r)
    print(r.headers)
    print(r.json())

def get(nid):
    query = 'users'
    r = requests.get(path+query)
    if id is not None:
        r = requests.get(path+query+'/'+nid)
    print(r.json())

def start(args):
    command = args[1]
    try:
        nid = args[2]
    except IndexError:
        nid = None
    if command == 'post':
        post()
    elif command == 'get':
        get(nid)

if __name__ == '__main__':
    start(sys.argv)
