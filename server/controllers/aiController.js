const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// Function to remove * and # from the AI response
const sanitizeResponse = (response) => {
    return response.replace(/[*#]/g, '');
};


// Post an AI note
const postAiNotes = async (req, res) => {
    try {
        const note  = req.body; 
        if (!note) {
            return res.status(400).json({ error: 'Note is required' });
        }


        const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            "Analyze the following notes. Provide short and simple suggestions, plans, and a summary . If the notes are about expenses or incomes, calculate the totals. If the note includes simple calculations like 2+2 provide only result like 4, provide only the result. also don't include heading.",
            note.notes
        ]);

        let aiResponse = await result.response.text();
        aiResponse = sanitizeResponse(aiResponse);

        res.status(200).json({ aiResponse });
    } catch (error) {
        console.error('Error in AI completion:', error);
        res.status(500).json({ error: 'Failed to generate AI response' });
    }
};


module.exports = {postAiNotes}