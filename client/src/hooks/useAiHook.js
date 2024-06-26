import { useState } from "react";
import { GoogleGenerativeAI } from '@google/generative-ai';

const useAiHook = () => {
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY);
    const [notes, setNotes] = useState('');

    const aiNotes = async (title, note) => {
        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const newNotes = `${title} : ${note}`;
            setNotes(newNotes);

            if (newNotes) {
                const result = await model.generateContent([
                    
                    "Analyze the following notes. Provide short and simple suggestions, plans, and a summary without using stars (*) or hash symbols (#). If the notes are about expenses or incomes, calculate the totals. If the note includes simple calculations, provide only the result.",
                    `${title} : ${note}`
                ]);

                const aiResponse = await result.response.text();
                return aiResponse;
            }
        } catch (error) {
            console.error('Error in AI completion:', error);
            throw error;
        }
    };

    return { aiNotes, notes };
}

export default useAiHook;
