from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)
@app.route("/health")
def health():
    return {"status": "ok"}
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "online"})


@app.route("/generate", methods=["POST"])
def generate():

    try:
        data = request.json
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"response": "Empty prompt received."})

        completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
        {
            "role": "user",
            "content": prompt
        }
    ]
)

        ai_response = completion.choices[0].message.content

        return jsonify({"response": ai_response})

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "response": "Server error while generating response."
        })


if __name__ == "__main__":
    app.run(port=5000, debug=True)
