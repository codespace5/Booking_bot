import os
import requests
openai.api_key = 'sggggggggggggggggk-lMTk8qxNRzk6bRoKwdqBT3BlbkFJ" + "XGr7r4xJyUCGo0lH7OdK'
api_key = "sggggggggggggggggggk-lMTk8qxNRzk6bRoKwdqBT3" + "BlbkFJXGr7r4xJyUCGo0lH7OdK"
model="gpt-3.5-turbo"
app = Flask(__name__)

@app.route('/test',methods=['GET'] )
def test():
    print('testing')
    return "testing ok"
@app.route('/chat', methods = ['POST'])
def chat():
    data = request.json
    # response = openai.ChatCompletion.create(
    #     model="gpt-3.5-turbo",
    #     messages=[{"role": "system", "content": "You are a helpful assistant."},
    #               {"role": "user", "content": data['message']}]
    # )    # return jsonify({"response": response.choices[0].message['content']})

    res = requests.post(f"https://api.openai.com/v1/engines/{model}/jobs", headers = {
            "Content-Type":"application/json",
            "Authorization":f"Bearer {api_key}"
            },
            json={
                "prompt":data['message'],
                "max_tokens":100
                }).json()
    print(res)
    return res.choices[0].text

if __name__ == '__main__':
    # Host = os.environ.get("SERVER_HOST", "0.0.0.0")
    # app.run(Host, debug=True)
    app.run(debug=True)
