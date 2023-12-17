import React, { useState, useRef, useContext } from 'react';
import { Box, Container as MuiContainer, ClickAwayListener, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { DataContext } from '../../Context/DataProvider';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    padding: 10px 15px;
    border-radius: 8px;
    border-color: "#e0e0e0";
    margin: auto;
    margin-bottom: 2rem;
    min-height: 30px;
`;

const note = {
    id: '',
    title: '',
    tagline: '',
    body: '',
}

const Form = () => {
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });
    const { setNotes } = useContext(DataContext);
    const containerRef = useRef();

    const onTextChange = (e) => {
        let changedNote = { ...addNote, [e.target.name]: e.target.value }
        setAddNote(changedNote);
    }

    return (
        <ClickAwayListener onClickAway={() => {
            setShowTextField(false);
            containerRef.current.style.minHeight = '30px';

            setAddNote({ ...note, id: uuid() });
            if (addNote.title || addNote.tagline || addNote.body) {
                setNotes(prevArr => [addNote, ...prevArr]);
            }
        }}>
            <MuiContainer maxWidth='sm'>
                <Container ref={containerRef}>
                    <TextField
                        size='small'
                        placeholder='Title'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onClick={() => {
                            setShowTextField(true);
                            containerRef.current.style.minHeight = '120px';
                        }}
                        onChange={(e) => onTextChange(e)}
                        name='title'
                        value={addNote.title}
                    />
                    <TextField
                        size='small'
                        placeholder='Tagline'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='tagline'
                        value={addNote.tagline}
                    />
                    <TextField
                        multiline
                        placeholder='Body'
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => onTextChange(e)}
                        name='body'
                        value={addNote.body}
                    />
                </Container>
            </MuiContainer>
        </ClickAwayListener>
    )
}

export default Form;
