import { useState, useRef, useEffect } from "react";

import axios from "axios";

import {
  Bot,
  SendHorizonal,
} from "lucide-react";

export default function Chatbot() {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const chatContainerRef = useRef(null);

  // ---------------- AUTO SCROLL TO LATEST MESSAGE ---------------- //

  useEffect(() => {

    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // ---------------- RESET SCROLL WHEN PAGE OPENS ---------------- //

  useEffect(() => {

    window.scrollTo(0, 0);

    if (chatContainerRef.current) {

      chatContainerRef.current.scrollTop = 0;

    }

  }, []);

  // ---------------- SEND MESSAGE ---------------- //

  const sendMessage = async () => {

    if (!input.trim()) return;

    const updatedMessages = [

      ...messages,

      {
        role: "user",
        content: input,
      },

    ];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    try {

      const res = await axios.post(

        "http://127.0.0.1:8000/chat",

        {
          messages: updatedMessages,
        }

      );

      setMessages([

        ...updatedMessages,

        {
          role: "assistant",
          content: res.data.response,
        },

      ]);

    }

    catch (err) {

      console.log(err);

      setMessages([

        ...updatedMessages,

        {
          role: "assistant",
          content:
            "Failed to generate response.",
        },

      ]);

    }

    setLoading(false);

  };

  // ---------------- ENTER KEY ---------------- //

  const handleKeyDown = (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      sendMessage();

    }

  };

  return (

    <div
      style={{
        background: "#f3f4f6",

        minHeight: "100vh",

        padding: "40px",
      }}
    >

      {/* ---------------- CHAT CONTAINER ---------------- */}

      <div
        style={{
          maxWidth: "1450px",

          margin: "0 auto",

          background: "white",

          borderRadius: "30px",

          overflow: "hidden",

          boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",

          display: "flex",

          flexDirection: "column",
        }}
      >

        {/* ---------------- HEADER ---------------- */}

        <div
          style={{
            padding: "50px 40px",

            textAlign: "center",

            borderBottom:
              "1px solid #e5e7eb",
          }}
        >

          <Bot
            size={65}
            color="#10b981"
          />

          <h1
            style={{
              fontSize: "85px",

              fontWeight: "900",

              color: "#0f172a",

              marginTop: "20px",
            }}
          >
            AI Chatbot
          </h1>

          <p
            style={{
              fontSize: "20px",

              color: "#475569",

              marginTop: "15px",
            }}
          >
            Ask technical questions and get AI-powered responses instantly.
          </p>

        </div>

        {/* ---------------- CHAT AREA ---------------- */}

        <div
          ref={chatContainerRef}

          style={{
            minHeight: "450px",

            maxHeight: "550px",

            overflowY: "auto",

            padding: "35px",

            background: "#f8fafc",
          }}
        >

          {messages.map((msg, index) => (

            <div
              key={index}

              style={{
                display: "flex",

                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",

                marginBottom: "24px",
              }}
            >

              <div
                style={{
                  background:
                    msg.role === "user"
                      ? "#2563eb"
                      : "white",

                  color:
                    msg.role === "user"
                      ? "white"
                      : "#0f172a",

                  padding: "18px 24px",

                  borderRadius: "22px",

                  maxWidth: "72%",

                  fontSize: "17px",

                  lineHeight: "1.8",

                  whiteSpace: "pre-wrap",

                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.06)",

                  border:
                    msg.role === "assistant"
                      ? "1px solid #e2e8f0"
                      : "none",
                }}
              >

                {msg.content}

              </div>

            </div>

          ))}

          {/* ---------------- LOADING ---------------- */}

          {loading && (

            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "10px",

                color: "#64748b",

                fontSize: "16px",
              }}
            >

              <div
                style={{
                  width: "10px",

                  height: "10px",

                  borderRadius: "50%",

                  background: "#2563eb",

                  animation:
                    "bounce 1s infinite",
                }}
              />

              AI is typing...

            </div>

          )}

          <div ref={chatEndRef}></div>

        </div>

        {/* ---------------- INPUT AREA ---------------- */}

        <div
          style={{
            padding: "28px",

            borderTop:
              "1px solid #e5e7eb",

            display: "flex",

            gap: "18px",

            background: "white",
          }}
        >

          <textarea
            placeholder="Ask anything about AI, ML, NLP..."

            value={input}

            onChange={(e) =>
              setInput(
                e.target.value
              )
            }

            onKeyDown={handleKeyDown}

            rows={1}

            style={{
              flex: 1,

              padding: "20px",

              borderRadius: "18px",

              border:
                "1px solid #cbd5e1",

              fontSize: "18px",

              outline: "none",

              resize: "none",

              background: "#f8fafc",

              fontFamily: "inherit",

              minHeight: "64px",
            }}
          />

          <button
            onClick={sendMessage}

            disabled={loading}

            style={{
              background: "#2563eb",

              color: "white",

              border: "none",

              padding: "0 34px",

              borderRadius: "18px",

              fontSize: "18px",

              fontWeight: "700",

              cursor: "pointer",

              display: "flex",

              alignItems: "center",

              gap: "10px",

              boxShadow:
                "0 4px 10px rgba(37,99,235,0.3)",
            }}
          >

            <SendHorizonal size={22} />

            Send

          </button>

        </div>

      </div>

    </div>

  );

}