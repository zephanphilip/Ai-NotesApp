import React from "react";
import { useNotesRecord } from "../../context/notesRecordContext";
import { Box, Button, Typography } from "@mui/material";
import NotesList from "../../components/NotesList/NotesList";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import { UserButton } from "@clerk/clerk-react";
import { parseISO, differenceInDays, isToday } from "date-fns";
import "./dashboard.css";

function Dashboard() {
  const { records, setEdit } = useNotesRecord();

  const navigate = useNavigate();

  const handleClick = (record) => {
    setEdit(null);
    setEdit(record);
    navigate("/edit");
  };

  const handleAddClick = () => {
    setEdit(null);
    navigate("/edit");
  };

  const dateSort = (dateString) => {
    const date =  parseISO(dateString);
    if(differenceInDays(new Date(), date)>0){
      const daysAgo = differenceInDays(new Date(), date);
      return `${daysAgo} Day${daysAgo !== 1 ? 's' : ''} ago`;
    }
    else {
      return "Today";
    }
  }

  const groupedRecords = records.reduce((groups, record) => {
    const dateKey = dateSort(record.updatedAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(record);
    return groups;
  }, {});
  

  return (
    <Box m={0} classname="note-container">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="header"
        m={2}
      >
        <Typography variant="h5" mr={2} sx={{ fontWeight: 'bold',color:'white' }}>
          Notes
        </Typography>
        <UserButton />
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" p={0} m={{ sm: 2 }} className="note-container">
  {Object.keys(groupedRecords).map((dateKey) => (
    <Box key={dateKey} mb={3} width="100%" className="group-container">
      <Typography variant="h6" align="start" ml={2} sx={{ fontWeight: 'bold' }}>{dateKey}</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {groupedRecords[dateKey].map((record) => (
          <Box key={record._id} m={1}>
            <Box onClick={() => handleClick(record)}>
              <NotesList record={record} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  ))}
</Box>

      <Box display="flex" justifyContent="flex-end" mb={1} className="footer">
        <Button
          variant="text"
          size="small"
          onClick={handleAddClick}
          startIcon={<Create />}
          sx={{ fontWeight: 'bold', fontSize: 14, color:'whitesmoke'}}
        >
          New Note
        </Button>
      </Box>
    </Box>
  );
}

export default Dashboard;
