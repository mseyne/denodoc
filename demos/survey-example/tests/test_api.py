import requests
from colors import colors

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

def get_user_data():
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

def get_survey_data():
    global data
    name = input("What is the survey name? ")
    description = input("What is the survey description? ")
    data = {
        "name":name,
        "description":description,
        "userid":''
    }

def ask_change_uid():
    global data
    uid = input("What is the survey author id ?")
    data['userid'] = uid

def post():
    result = requests.post(path+query,json=data)
    return display_result(result)

def get():
    result = requests.get(path+query)
    return display_result(result)

def put():
    print(path+query,data, "update")
    result = requests.put(path+query,json=data)
    return display_result(result)

def delete():
    result = requests.delete(path+query)
    return display_result(result)

def display_result(r):
    print("\n==============")
    print(colors.WARNING+colors.BOLD+r.url, "-", r.status_code, '-',  r.reason+colors.ENDC)
    print(r.headers)
    json = r.json()
    print(json)
    print(colors.WARNING+json['msg']+colors.ENDC)
    print("==============\n")
    return json['success']

def start():
    global query
    print(f'\n{colors.HEADER}Testing API for the {API_NAME}.{colors.ENDC}')
    print("1. REGISTER a new user")
    print("2. LOGIN a user")
    print("3. SURVEY API")
    print()
    result = input('Choose an option: ')
    command = ''
    if result in ["1", "2", "3"]:
        result = int(result)
        if result == 1:
            get_user_data()
            command = "post"
            query = "register"
        if result == 2:
            get_user_data()
            command = "post"
            query = "login"
        if result == 3:
            r = survey()
            if r is not None:
                command = r[0]
                query = r[1]
    else:
        print(colors.FAIL+'The option choice is incorrect.')
        return

    if command == 'post':
        post()
    elif command == 'get':
        get()
    elif command == 'update':
        put()
    elif command == 'delete':
        delete()
    else:
        print(colors.FAIL+'Error, exit test.')
        return

    print(colors.OKGREEN+'Test completed')

def user():
    '''USER API'''
    pass

def survey():
    '''SURVEY API'''
    global query
    print(colors.HEADER+'\nSurvey API.'+colors.ENDC)
    print('1. Create Survey')
    print('2. Get All Surveys of current User')
    print('3. Get one Survey')
    print('4. Update one Survey')
    print('5. Delete one Survey')
    print()
    result = input('Choose an option: ')
    if result in list("12345"):
        command = ''
        query = 'survey'
        surveyid = ''
        r = int(result)
        if r == 1:
            get_survey_data()
            command = 'post'
        elif r == 2:
            command = 'get'
        elif r == 3:
            command = 'get'
            surveyid = ask_surveyid(command)
        elif r == 4:
            command = 'update'
            surveyid = ask_surveyid(command)
            query += surveyid
            success = get()
            if (success):
                query = 'survey'
                get_survey_data()
                ask_change_uid()
            else:
                return None
        elif r == 5:
            command = 'delete'
            surveyid = ask_surveyid(command)
        query += surveyid
        return (command,query)
    else:
        print(colors.FAIL+"Not a correct choice.")
        return None

def ask_surveyid(c):
    sid = input(f"What is the survey id you want to {c}? ")
    return "/"+sid

if __name__ == '__main__':
    start()
