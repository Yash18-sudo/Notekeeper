import React, { useState, useContext } from 'react';
import { Card, CardActions, CardContent, IconButton, Typography, Tooltip, Modal, Backdrop, Fade, TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined, DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { DataContext } from '../../Context/DataProvider';

const NoteCard = styled(Card)`
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    max-height: 200px;
    overflow-Y: scroll;
    &:hover {
        box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302), 0 1px 3px 1px rgba(60, 64, 67, 0.149);
    }
`;

const EditModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; /* Set background-color to transparent */
`;

const EditModalContent = styled(Box)`
    background-color: white;
    border: 2px solid #000;
    border-radius: 8px;
    padding: 20px;
    width: 300px;
    max-height:400px;
    overflow-Y: scroll;
    text-align: center;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
    display:flex;
    flex-direction:column;
    align-items: center;
    gap:10px;
`;

const Note = ({ note }) => {
    const [showActions, setShowActions] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedNote, setEditedNote] = useState(note);
    const { notes, setNotes, setArchivedNotes, setDeletedNotes } = useContext(DataContext);

    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setArchivedNotes(prevArr => [...prevArr, note]);
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeletedNotes(prevArr => [...prevArr, note]);
    }

    const handleEditOpen = () => {
        setEditedNote(note);
        setEditModalOpen(true);
    };

    const handleEditClose = () => {
        setEditModalOpen(false);
    };

    const handleNoteEdit = () => {
        const updatedNotes = notes.map((n) => (n.id === editedNote.id ? editedNote : n));
        setNotes(updatedNotes);
        setEditModalOpen(false);
    };

    const onTextChange = (e) => {
        setEditedNote({
            ...editedNote,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <NoteCard
                onClick={handleEditOpen} 
                onMouseEnter={() => setShowActions(true)}
                onMouseLeave={() => setShowActions(false)}
            >
                <CardContent sx={{ wordWrap: "break-word" }}>
                    <Typography variant="h6">{note.title}</Typography>
                    <Typography>{note.tagline}</Typography>
                    <Typography>{note.body}</Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "end", marginLeft: "auto" }}>
                    <Tooltip title="Archive">
                        <IconButton
                            sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                            onClick={() => archiveNote(note)}
                        >
                            <ArchiveOutlined fontSize='small' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton
                            sx={{ visibility: showActions ? 'visible' : 'hidden' }}
                            onClick={() => deleteNote(note)}
                        >
                            <DeleteOutlineOutlined fontSize='small' />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </NoteCard>

            {/* Edit Modal */}
            <EditModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={editModalOpen}
                onClose={handleEditClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    style: {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <Fade in={editModalOpen}>
                    <EditModalContent>
                        <Typography variant="h6" mb={2}>Edit Note</Typography>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            name="title"
                            value={editedNote.title}
                            onChange={onTextChange}
                            mb={2}
                        />
                        <TextField
                            label="Tagline"
                            variant="outlined"
                            fullWidth
                            name="tagline"
                            value={editedNote.tagline}
                            onChange={onTextChange}
                            mb={2}
                        />
                        <TextField
                            label="Body"
                            variant="outlined"
                            multiline
                            fullWidth
                            name="body"
                            value={editedNote.body}
                            onChange={onTextChange}
                            mb={2}
                        />
                        <Button variant="contained" onClick={handleNoteEdit}>Save</Button>
                    </EditModalContent>
                </Fade>
            </EditModal>
        </>
    );
}

export default Note;
