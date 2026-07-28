import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


export const generatePrice = async (req, res) => {
  try {
    const { title, tag, description } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are an expert photography marketplace pricing advisor.",
        },
        {
          role: "user",
          content: `
Suggest a fair selling price for this photograph.

Title: ${title}

Category: ${tag}

Description:
${description}


Rules:
- Price must be in Indian Rupees.
- Minimum price is 10000.
- Maximum price is 100000.
- Return only the number.
- Do not include ₹ symbol.
- Do not add any explanation.
`,
        },
      ],

      max_tokens: 20,
    });


    let price = completion.choices[0].message.content.trim();

    // Remove anything except numbers
    price = price.replace(/[^0-9]/g, "");


    res.status(200).json({
      success: true,
      price: Number(price),
    });


  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to generate price",
    });
  }
};