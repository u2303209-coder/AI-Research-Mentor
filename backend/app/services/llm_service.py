import ollama

SYSTEM_PROMPT = """
You are an expert AI and Machine Learning assistant.

Rules:
- Give accurate technical answers
- Avoid hallucinations
- If unsure, say you are unsure
- Use concise markdown bullet points
- Use beginner-friendly explanations
- Avoid unnecessary long paragraphs
- Prefer commonly accepted AI/ML terminology
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

                "temperature": 0.1,
                "num_predict": 300

            }

        )

        return response["message"]["content"]

    except Exception as e:

        return f"Error: {str(e)}"