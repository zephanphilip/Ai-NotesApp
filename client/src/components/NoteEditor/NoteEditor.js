import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  ToggleButton,
  InputBase,
  Button,
} from "@mui/material";
import { useNotesRecord } from "../../context/notesRecordContext";
import { useUser } from "@clerk/clerk-react";
import useDebounce from "../../hooks/useDebounce";
import { Delete, AutoAwesome, ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAiHook from "../../hooks/useAiHook";
import "./noteEditor.css";

function NoteEditor() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { edit, addRecord, updateRecord, deleteRecord } = useNotesRecord();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState("");
  const debouncedNotesValue = useDebounce(notes, 1500);
  const debouncedTitleValue = useDebounce(title, 3000);
  const [loading, setLoading] = useState(null);
  const [selected, setSelected] = useState(false);
  const debouncedAiNotesValue = useDebounce(notes, 100000);
  const { aiNotes } = useAiHook();

  useEffect(() => {
    if (edit !== null) {
      setTitle(edit.title);
      setNotes(edit.notes);
      setEditId(edit._id);
    }
  }, [edit]);

  //autosave function calling
  useEffect(() => {
    autoSave();
  }, [debouncedNotesValue, debouncedTitleValue]);

  //ai Notes
  // AI Notes generation
  useEffect(() => {
    if (selected) {
      generateAiNotes();
    }
  }, [selected]);

  const generateAiNotes = async () => {
    try {
      const aiResponse = await aiNotes(title, notes);
      setNotes(`${notes} ${aiResponse}`);
      setSelected(false);
    } catch (error) {
      console.error("Error generating AI notes:", error);
    }
  };

  //autosave
  const autoSave = () => {
    setLoading(true);
    const record = { title, notes, userId: user.id };
    console.log(record);
    if (edit === null) {
      addRecord(record);
      console.log("saved successfully");
    } else {
      updateRecord(editId, record);
      console.log("savingggg");
    }
    setLoading(false);
  };

  // updating title and notes
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  //delete note
  const handleDeleteClick = () => {
    deleteRecord(edit._id);
    navigate("/");
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m={0}
      >
        <IconButton onClick={goBack}>
          <ChevronLeft sx={{color: "white"}}/>
        </IconButton>
        {edit && (
          <IconButton onClick={() => setSelected(!selected)}>
            <AutoAwesome color="primary" variant="contained" fontSize="small" />
          </IconButton>
        )}
        {edit && (
          <IconButton onClick={handleDeleteClick}>
            <Delete sx={{color: "white"}}/>
          </IconButton>
        )}
      </Box>

      <Box className="note-editor-container" m={0}>
        <InputBase
          fullWidth
          placeholder="Your title here..."
          onChange={handleTitleChange}
          value={title}
          m={2}
          sx={{ fontSize: 26, fontWeight: "bold",color:"white" }}
          color="white"
        />
        <InputBase
          m={2}
          fullWidth
          placeholder="your notes here..."
          multiline
          onChange={handleNotesChange}
          value={notes}
          sx={{ fontSize: 18, color:"white" }}
          
        />
      </Box>
    </Box>
  );
}

export default NoteEditor;
