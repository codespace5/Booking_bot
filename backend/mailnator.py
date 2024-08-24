# import requests
# import re

# def get_security_code(email_address):
#     # API endpoint for fetching messages from Mailinator
#     api_url = f"https://api.mailinator.com/v3/messages?to={email_address}"

#     # Your Mailinator API token
#     api_token = "b8755007b559420ba04ccf9b2baf4881"

#     # Make a GET request to fetch the messages
#     response = requests.get(api_url, headers={"X-Api-Key": api_token})

#     # Check if the request was successful
#     if response.status_code == 200:
#         # Parse the JSON response
#         messages = response.json()

#         # Extract the latest message body
#         latest_message = messages["messages"][0]["data"]["parts"][0]["body"]

#         # Use regex to find the security code
#         security_code = re.search(r'\b\d{4}\b', latest_message)

#         if security_code:
#             return security_code.group()
#         else:
#             return None
#     else:
#         print("Failed to fetch messages from Mailinator.")
#         return None

# # Example usage
# email_address = "testacc5@mailinator.com"
# security_code = get_security_code(email_address)

# if security_code:
#     print("Security code:", security_code)
# else:
#     print("No security code found in the latest email.")




import requests
import re

def get_login_security_code(email_address, token):
    url = f"https://api.mailinator.com/api/v2/inbox/{email_address}/messages?token={token}"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        data = response.json()
        latest_message = data["messages"][0]["data"]["parts"][0]["body"]

        # Use regex to find the security code (assuming it's a 4-digit code)
        security_code = re.search(r'\b\d{4}\b', latest_message)

        if security_code:
            return security_code.group()
        else:
            return None
    except Exception as e:
        print("Error fetching login security code:", e)
        return None

# Example usage
email_address = "testacc5"  # Your Mailinator inbox name
token = "142638E853764D"  # Your Mailinator API token

security_code = get_login_security_code(email_address, token)

if security_code:
    print("Login security code:", security_code)
else:
    print("No login security code found in the latest email.")

