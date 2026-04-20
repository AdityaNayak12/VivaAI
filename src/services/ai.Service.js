import axios from "axios";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function generateViva(topic) {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    const prompt = `
Generate 3 viva questions on "${topic}".

For each question, also provide 3-5 important keywords.

Respond ONLY in JSON format like:
[
  {
    "question": "...",
    "keywords": ["...", "..."]
  }
]
`;

    try {
        const res = await axios.post(
            API_URL,
            {
                model: "openai/gpt-oss-120b",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = res.data.choices[0].message.content;
        return JSON.parse(content);
    } catch (err) {
        console.error("AI error:", err);
        if (err.response) {
        //console.error("Groq error response:", err.response.data);
}

        return [
            {
                question: "Explain the topic",
                keywords: ["concept", "definition", "example"],
            },
            {
                question: "What are key features?",
                keywords: ["features", "advantages"],
            },
            {
                question: "Give a real-world use case",
                keywords: ["application", "use case"],
            },
        ];
    }
}