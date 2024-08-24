import os
import openai
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

ssl_context=('fc8c03b460d8560.crt', 'attflexPrivate.key')
openai.api_key = 'sgggggggggggggk-lMTk8qxNRzk6bR" + "oKwdqBT3BlbkFJXGr7r4xJyUCGo0lH7OdK'
api_key = "sgggggggggggggggggggk-lMTk8qxNRzk6bRoK" "wdqBT3BlbkFJXGr7r4xJyUCGo0lH7OdK"
model="gpt-3.5-turbo"
app = Flask(__name__)
CORS(app)
@app.route('/test',methods=['GET'] )
def test():
    print('testing')
    return "testing ok"
@app.route('/chat', methods = ['POST'])
def chat():
    base_prompt = "Please answer in detail"
    system_prompt = """
    You are a highly advanced AI chatbot specialized in network engineering. Your primary role is to assist network engineers with various tasks, including troubleshooting network issues, providing best practices, offering configuration guidance, and answering technical questions related to networking. Respond in a clear, concise, and professional manner, using technical jargon appropriately.
    """
    data = request.json
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": system_prompt},
                  {"role": "user", "content": base_prompt + data['message']}]
    )  
    # return jsonify({"response": response.choices[0].message['content']})
    print("respnse", response.choices[0].message['content'])
    return jsonify({"data": response.choices[0].message['content']})

    # res = requests.post(f"https://api.openai.com/v1/engines/{model}/jobs", headers = {
    #         "Content-Type":"application/json",
    #         "Authorization":f"Bearer {api_key}"
    #         },
    #         json={
    #             "prompt":data['message'],
    #             "max_tokens":100
    #             }).json()
    # print(res)
    # return res.choices[0].text

if __name__ == '__main__':
    HOST = os.environ.get("SERVER_HOST", "0.0.0.0")
    ssl_context=('fc8c03b460d8560.crt', 'attflexPrivate.key')
    try:
        PORT = int(os.environ.get("SERVER_PORT", "443"))
    except ValueError:
        PORT = 1234
    app.secret_key = "1cd6f35db029d4b8fc98fc05c9efd06a2e2cd1ffc3774d3f035ebd8d"
    # app.config['SERVER_NAME'] = "videobot.attflex.com"
    app.run(HOST, PORT, debug=False, threaded=True, ssl_context=ssl_context)