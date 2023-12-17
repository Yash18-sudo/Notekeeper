import React, { useContext, useState } from 'react';
import Form from './Form';
import Note from './Note';
import { DataContext } from '../../Context/DataProvider';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { LightbulbOutlined } from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Notes = () => {
  const { notes, setNotes } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  };

  const indexOfLastNote = currentPage * itemsPerPage;
  const indexOfFirstNote = indexOfLastNote - itemsPerPage;
  const paginatedNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <React.Fragment>
      <Form />

      {notes.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5rem',
          }}
        >
          <LightbulbOutlined
            sx={{
              backgroundSize: '120px 120px',
              height: '120px',
              margin: '20px',
              opacity: '.1',
              width: '120px',
            }}
          />
          <Typography
            sx={{ fontSize: '1.375rem' }}
            align='center'
            variant='h6'
            color='#5f6368'
          >
            Notes you add appear here
          </Typography>
        </Box>
      ) : (
        <Container maxWidth='lg'>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {paginatedNotes.map((note, index) => (
                    <Draggable
                      key={note.id}
                      draggableId={note.id}
                      index={index + indexOfFirstNote}
                    >
                      {(provided) => (
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={4}
                          lg={4}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note note={note} />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Button
              variant='outlined'
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography
              sx={{ margin: '0 1rem', display: 'flex', alignItems: 'center' }}
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant='outlined'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

export default Notes;
