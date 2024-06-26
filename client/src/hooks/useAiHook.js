import { useState } from "react"

const useAiHook = ()=>{
    const [notes,setNotes] = useState('');
   const aiNotes = async (title,note)=>{
    try {
        const newNotes = `${title} :  ${note}`
        setNotes(newNotes);
        const apiUrl='https://api.openai.com/v1/chat/completions';
        const apiKey = process.env.API_KEY;
        const headers = {'Content-Type' : 'application/json',
                         'Authorization' : `Bearer ${apiKey}`
                        }
        
        
        if(newNotes){
            console.log("ai inggg",`${title} :  ${note}`);
            const data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { 
                    role: 'system',
                    content: "Analyze the following notes. Provide short and simple suggestions, plans, and a summary. If the notes are about expenses or incomes, calculate the totals. If the note includes simple calculations, provide only the result."
        
                },
                {
                    role: 'user',
                    content: `${title} :  ${note}`,
                },
            ],
        };
        const response = await fetch(apiUrl,{method: 'POST',headers,body : JSON.stringify(data)})
        const result = await response.json();
            console.log("AI Response:", result);

            if (result.choices && result.choices.length > 0) {
                const aiResponse = result.choices[0].message.content;
                return aiResponse;
            } else {
                throw new Error("No choices found in AI response");
            }
        }
        } catch (error) {
            console.error('Error in AI completion:', error);
            throw error;
        }
   }

   return {aiNotes}

}

export default useAiHook