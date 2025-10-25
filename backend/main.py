from fastapi import FastAPI
from dotenv import load_dotenv
import os
import anthropic

load_dotenv()

app = FastAPI()

claude_api_key = os.getenv("CLAUDE_API_KEY")

async def get_claude_response(prompt: str) -> str:
    client = anthropic.Anthropic(api_key=claude_api_key)
    try:
        message = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return message
    except Exception as e:
        print(f"Error: {e}")
        return ""

@app.get("/")
async def read_root():
    response = await get_claude_response("Hello, Claude! Can you tell me a joke?")
    return {"joke": response}