import os
import re
import requests
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import random
import json
from enum import Enum

openai.api_key = 'sggggggggggggk-lMTk8qxNRzk6bRoKw" "dqBT3BlbkFJXGr7r4xJyUCGo0lH7OdK'
api_key = "sgggggggggggggggggk-lMTk8qxNRzk6bRoKwdqBT" "3BlbkFJXGr7r4xJyUCGo0lH7OdK"
model="gpt-3.5-turbo"


code = ''
app = Flask(__name__)
CORS(app)

def contains_email_or_phone(content):
    # Regular expression for email addresses
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    # Regular expression for phone numbers (supports various formats)
    phone_pattern = r'\b(?:\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b'

    # Check if either email or phone number is found in the content
    if re.search(email_pattern, content) or re.search(phone_pattern, content):
        return True
    else:
        return False
def getverificationcode():
    res =  requests.post('https://bh.advancedcare.com/api/public/v2/booking?action=send_passcode', json={"email": "testacc5@mailinator.com"})
    print("awwdaaawawaaaaaaaaaaaaaaaaaaa12212121231223", res)
    if res.status_code == 200:
        verification_response = res.json()
        person_id = verification_response.get('person_id')
        print("persone id 1111111111111111", person_id)
        return person_id
    
class ApiClient:
	apiUri = 'https://api.elasticemail.com/v2'
	apiKey = '487E8EC31E1EAAB9001ECA658DB427746E4A30DDC4D30D49EFF667FD08B88C0F507692593A1CE0B45AE98B6FAB1E186A'

	def Request(method, url, data):
		data['apikey'] = ApiClient.apiKey
		if method == 'POST':
			result = requests.post(ApiClient.apiUri + url, data = data)
		elif method == 'PUT':
			result = requests.put(ApiClient.apiUri + url, data = data)
		elif method == 'GET':
			attach = ''
			for key in data:
				attach = attach + key + '=' + data[key] + '&' 
			url = url + '?' + attach[:-1]
			result = requests.get(ApiClient.apiUri + url)	
			
		jsonMy = result.json()
		
		if jsonMy['success'] is False:
			return jsonMy['error']
			
		return jsonMy['data']

def Send(subject, EEfrom, fromName, to, bodyHtml, bodyText, isTransactional):
	return ApiClient.Request('POST', '/email/send', {
		'subject': subject,
		'from': EEfrom,
		'fromName': fromName,
		'to': to,
		'bodyHtml': bodyHtml,
		'bodyText': bodyText,
		'isTransactional': isTransactional})

def Generate_code():
	return str(random.randint(10000, 99999))



@app.route('/test',methods=['GET'] )
def test():
    print('testing')
    return "testing ok"
@app.route('/chat', methods = ['POST'])
@cross_origin()
def chat():
    data = request.json
    baseprompt = 'please submit within one sentence \n'
    prompt = baseprompt + data['message']
    res = ''
    global code
    # response = openai.ChatCompletion.create(
    #     model='gpt-3.5-turbo',
    #     messages=[{"role": "system", "content": 'You are a helpful research assistance.'},{"role": "user", "content": prompt}],
    #     max_tokens=1000                                        
    # )

    # res = response["choices"][0]["message"]["content"]
    # return res
    print("xxxxxserserersesre1", data['message'] )
    if "schedule" in data['message'].lower() or "appointment" in data['message'].lower():
        data = {
            "sender": 'bot',
            # "type": 'scheduleTime',
            "type": 'text',
            "content":"I'd be happy to assist you. To get started, could you please provide me with your name and some contact information?"
            # "type": 'selectTimezone',
        }
        return jsonify(data)
    
    # if data['message'] == 'Existing Patient':
    if data['message'] == 'Clinic' or data['message'] == 'Remote':
        print("remote is clicked")
        data = {
            "sender": 'bot',
            # "type": 'scheduleTime',
            "type": 'text',
            "content":"Please select one of available services. Swipe left or right to see available services"
            # "type": 'selectTimezone',
        }
        return jsonify(data)
    if contains_email_or_phone(data['message']):
        data_to_return = {
            "sender": 'bot',
            "type": 'text',
            "content":"I just sent a verification code to your email. Can you enter it here?"
        }
        code = Generate_code()
        Send("Your Subject", "nmurray@gmail.com", "Your Company Name", data['message'], "Verification code is " + code, "Text Body", True)
        # Send("Your Subject", "nmurray@gmail.com", "Your Company Name", "codespacep@gmail.com", "Verification code is " + code, "Text Body", True)
        return jsonify(data_to_return)
    # if "verification" in data['message'].lower():
    #     # res = ''
    #     res = requests.post('https://bh.advancedcare.com/api/public/v2/booking?action=send_passcode', json={"email": "testacc5@mailinator.com"})
    #     print("12212121231223", res)
    #     if res.status_code == 200:
    #         verification_response = res.json()
    #         person_id = verification_response.get('person_id')
    #         print("persone id 1111111111111111", person_id)
    if "emailcode" in data['message'].lower(): 
        # person_id = getverificationcode()
        # print("ttttttttt", person_id)
        # res = await requests.post('https://bh.advancedcare.com/api/public/v2/booking?action=send_passcode', json={"email": "testacc5@mailinator.com"})
        # print("12212121231223", res)
        # if res.status_code == 200:
        #     verification_response = res.json()
        #     person_id = verification_response.get('person_id')
        #     print("persone id 1111111111111111", person_id)
        pass_code = data['message'][10:]
        print('passcode', pass_code, "end")
        print('personde', code, "end")
        if pass_code == code:
            print('passcode is same with person_id')
            data_to_return = {
                "sender": 'bot',
                "type": 'text',
                "content":"The verification code is correct"
            }
        else:                                            
            print("passcode is not same with person_id")                                                                    
            data_to_return = {
                "sender": 'bot',
                "type": 'text',
                "content":"The verification code is not correct"
            }
        return jsonify(data_to_return)
    return res

if __name__ == '__main__':
    Host = os.environ.get("SERVER_HOST", "0.0.0.0")
    app.run(Host, debug=True)
    # app.run(debug=True)


# import os
# import re
# from quart import Quart, request, jsonify
# import httpx
# from quart_cors import cors

# app = Quart(__name__)
# cors(app)  # This applies CORS to all routes and methods by default

# # Utility function to check for email or phone number
# async def contains_email_or_phone(content):
#     email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
#     phone_pattern = r'\b(?:\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b'
#     if re.search(email_pattern, content) or re.search(phone_pattern, content):
#         return True
#     return False




# # Test route to ensure the server is up
# @app.route('/test', methods=['GET'])
# async def test():
#     return "Testing OK"

# # Main chat route to handle requests
# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json
#     message = data.get('message', '').strip()

#     if "schedule" in message.lower() or "appointment" in message.lower():
#         return jsonify({
#             "sender": 'bot',
#             "type": 'text',
#             "content": "I'd be happy to assist you. To get started, could you please provide me with your name and some contact information?"
#         })

#     if message == 'Existing Patient':
#         return jsonify({
#             "sender": 'bot',
#             "type": 'serviceItem'
#         })

#     if  contains_email_or_phone(message):
#         person_id =  get_verification_code("testacc5@mailinator.com")  # Use a generic email for example purposes
#         if person_id:
#             return jsonify({
#                 "sender": 'bot',
#                 "type": 'text',
#                 "content": f"I just sent a verification code to your email. Please enter it here."
#             })
#         else:
#             return jsonify({
#                 "sender": 'bot',
#                 "type": 'text',
#                 "content": "Failed to send a verification code. Please check the email provided and try again."
#             })

#     if "emailcode" in message.lower():
#         # Assuming the message format is "emailcode xxxx"
#         code_entered = message.split()[1]  # Extract the code entered by the user
#         person_id = str( get_verification_code("testacc5@mailinator.com"))  # Retrieve the expected person_id again

#         print("passcode", code_entered)
#         print("personce", person_id)

#         print("code_entered:", code_entered, type(code_entered))
#         print("person_id:", person_id, type(person_id))

#         if code_entered == person_id:
#             return jsonify({
#                 "sender": 'bot',
#                 "type": 'text',
#                 "content": "The verification code is correct.",
#                 # "addition":["New Patient", "Existing Patient"]
#             })
#         else:
#             return jsonify({
#                 "sender": 'bot',
#                 "type": 'text',
#                 "content": "The verification code is incorrect."
#             })

#     # Default response if none of the conditions are met
#     return jsonify({
#         "sender": 'bot',
#         "type": 'text',
#         "content": "Your message was received but no specific actions were taken."
#     })

# if __name__ == '__main__':
#     app.run(port=5000)
