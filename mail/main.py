import ElasticEmail


key = 'tttttttttttttttttB3043FA5F555237A3F2349B7B2165A7D27C3D4686AA" "F8F6EFAB8E84C03A6F9C797A50AB3EF1C8D0840FF82682CB56057'

configuration = ElasticEmail.Configuration()
configuration.api_key['apikey'] = 'ggggggggggggggggB3043FA5F555237A3F2349B7B2165A7D27C3D4686AA" "F8F6EFAB8E84C03A6F9C797A50AB3EF1C8D0840FF82682CB56057'
 
with ElasticEmail.ApiClient(configuration) as api_client:
    api_instance = emails_api.EmailsApi(api_client)
    email_message_data = EmailMessageData(
        recipients=[
            EmailRecipient(
                email="MeowWow "
            ),
        ],
        content={
	    "Body": [
		{
		    "ContentType":"HTML",
		    "Content":"My test email content ;)"
		}
	    ],
	    "Subject": "Python EE lib test",
	    "From": "codespacep@gmail.com"
	}
    )
 
    try:
        api_response = api_instance.emails_post(email_message_data)
        print(api_response)
    except ElasticEmail.ApiException as e:
        print("Exception when calling EmailsApi->emails_post: %s\n" % e)