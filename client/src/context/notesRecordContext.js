import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";


export const NotesRecordContext = createContext(undefined)

export const NotesRecordProvider = ({children}) => {

    const [records,setRecords] = useState([]);
    const [edit,setEdit] = useState(null);
    const { user } = useUser();

    const fetchRecord = async () => {
        if (!user) return;
        const response = await fetch(`https://ai-notes-app-five.vercel.app/api/notes/${user.id}`)

        if (response.ok)
            {
                const record = await response.json();
                setRecords(record);
                console.log(record);
            }
    }

    useEffect( () => { 
        fetchRecord();
    },[user]
    );

    const addRecord = async (record) => {
        const response = await fetch('https://ai-notes-app-five.vercel.app/api/notes',{
            method: 'POST',
            body: JSON.stringify(record),
            headers: {
                "Content-Type" : "application/json"
            },
        })
        if(response.ok){
            const newRecord = await response.json();
            setRecords((prev)=>[...prev,newRecord])
            setEdit(newRecord);
        }
    }

    const updateRecord = async (id,newRecord) => {
        const response = await fetch(`https://ai-notes-app-five.vercel.app/api/notes/${id}`,{
            method: 'PUT',
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type" : "application/json"
            },
        })
        try {
            if(response.ok){
                const newRecord = await response.json()
                setRecords((prev)=> prev.map((record)=> 
                    {
                        if(record._id===id)
                        {
                            return newRecord
                        }
                        else return record
                }))
            }
        } catch (error) {
            
        }
    }

    const deleteRecord = async(id) => {
        const response = await fetch(`https://ai-notes-app-five.vercel.app/api/notes/${id}`,{
            method : 'DELETE'
        })
        if(response.ok){
            const deletedRecord = await response.json();
            setRecords((prev) => 
                prev.filter((record) => record._id !== deletedRecord._id)
            )
        }

    }

    return (
        <NotesRecordContext.Provider value={{records,addRecord,deleteRecord,edit,setEdit,updateRecord}}>
            {children}
        </NotesRecordContext.Provider>
    )

}


export const useNotesRecord = () => {
    const context = useContext(NotesRecordContext);

    if(!context){
        throw new Error(
            "useNotesRecords must be used within a NotesRecordsProvider"
        )
    }
    return context
}