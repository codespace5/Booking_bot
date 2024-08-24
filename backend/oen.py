import os
import openai

openai.api_key = 'sggggggggk-MEOdHOYcHjXaMqwr" "dtEWT3BlbkFJxMiMh1ENQWyCdo70BIdw'

response = openai.ChatCompletion.create(
        model='gpt-4',
        messages=[{"role": "system", "content": 'You are a helpful research assistance.'},{"role": "user", "content": "what is an apple?"}],
        max_tokens=1000                                        
    )

page_summary = response["choices"][0]["message"]["content"]
print(page_summary)
