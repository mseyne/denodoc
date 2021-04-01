import requests
import sys

## TO TEST :
# GET <is> get one product with id
# GET get all products 
# POST add product
# PUT <id> update product
# DELETE <id> delete product

url = 'http://localhost'
port = '5000'
path = url+':'+port+'/api/v1/products/'

data = {
    "name":"John",
    "description":"This is an new product for John",
    "price":"99.99"
}

def post():
    r = requests.post(path,json=data)
    print(r)
    print(r.headers)
    print(r.json())

def get(nid):
    r = requests.get(path)
    if id is not None:
        r = requests.get(path+nid)
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
