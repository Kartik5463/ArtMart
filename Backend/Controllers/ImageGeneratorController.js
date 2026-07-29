import axios from "axios";
import fs from "fs";
import path from "path";

export const generateImage = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const prompt = `
Generate a realistic, professional, high-quality photograph.

Title: ${title}

Description: ${description}

Requirements:
- Ultra realistic
- 4K quality
- Sharp focus
- Natural lighting
- No watermark
- No text
`;

    // Generate image using Pollinations
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}`;

    // Download image
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Ensure uploads folder exists
    const uploadsDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Create unique filename
    const filename = `ai-${Date.now()}.png`;

    // Save image
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, response.data);

    return res.status(200).json({
      success: true,
      filename,
      imageUrl: `http://localhost:5000/uploads/${filename}`,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate image.",
    });
  }
};