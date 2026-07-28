import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateDescription = async (req, res) => {
    try {
        const { title, tag } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert photography marketplace copywriter.",
                },
                {
                    role: "user",
                    content: `Generate a professional description for this photo.

Title: ${title}
Category: ${tag}

Requirements:
- Maximum 60 words
- Attractive and professional
- Mention possible use cases
- Don't use emojis.`,
                },
            ],
        });
        let description = completion.choices[0].message.content.trim();

        // Remove surrounding quotes if present
        description = description.replace(/^["']|["']$/g, "");

        res.status(200).json({
            success: true,
            description
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Failed to generate description",
        });
    }
};