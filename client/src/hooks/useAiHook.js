import { useState } from "react";

const useAiHook = () => {
    const [notes, setNotes] = useState('');

    const aiNotes = async (title, note) => {
        try {
            const newNotes = `${title} : ${note}`;
            setNotes(newNotes);

            if (newNotes) {
                const response = await fetch('https://ai-notes-app-zephans-projects.vercel.app/api/ai', {
                    method: 'POST',
                    body: JSON.stringify({ notes: newNotes }), // Send data as an object
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json(); 
                return result.aiResponse;
            }
        } catch (error) {
            console.error('Error in AI completion:', error);
            throw error;
        }
    };

    return { aiNotes, notes };
}

export default useAiHook;
