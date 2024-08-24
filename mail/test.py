import random
import requests
import json
from enum import Enum
class ApiClient:
	apiUri = 'https://api.elasticemail.com/v2'
	apiKey = 'ggggggggggggggggggggggg487E8EC31E1EAAB9001ECA658DB427746E4A30DDC4D30D49EF" + "F667FD08B88C0F507692593A1CE0B45AE98B6FAB1E186A'

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


code = Generate_code()
				
print(Send("Your Subject", "nmurray@gmail.com", "Your Company Name", "codespacep@gmail.com", "Verification code is " + code, "Text Body", True))