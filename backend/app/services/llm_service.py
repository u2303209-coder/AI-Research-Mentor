import ollama


SYSTEM_PROMPT = """
You are an expert AI and Machine Learning assistant.

Rules:
- Give accurate technical answers
- Avoid hallucinations
- If unsure, say you are unsure
- Use beginner-friendly explanations
- Keep responses conversational and natural
- Use bullet points whenever suitable
- Avoid unnecessary markdown symbols like ** or ##
- Avoid abrupt incomplete endings
- Finish all explanations properly
- Sound like a modern AI assistant
"""


def ask_llm(prompt):

    try:

        response = ollama.chat(

            model="llama3",

            messages=[

                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            options={

                # MORE NATURAL RESPONSES

                "temperature": 0.4,

                # ALLOW LONGER RESPONSES

                "num_predict": 1024,

                # MORE STABLE OUTPUT

                "top_p": 0.9,

            }

        )

        return response["message"]["content"]

    except Exception as e:

        return f"Error: {str(e)}"