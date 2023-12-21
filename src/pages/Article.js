import React, { useState, useEffect } from 'react';
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Select,
  MenuItem,
  TextareaAutosize,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { tokens } from '../theme';
import Header from '../components/layouts/Header';
import { newArticle, getAllArticles, clearErrors } from '../redux/actions/articleActions';
import { getAllAuthors } from '../redux/actions/authorActions';

import {
  NEW_ARTICLE_RESET,
} from '../redux/constants/articleConstants';

const Article = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [authorId, setAuthorId] = useState('');

  const { loading, error, success } = useSelector(state => state.newArticle);
  const { authors } = useSelector(state => state.authors);
  const { articles } = useSelector(state => state.articles)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAllArticles());
    dispatch(getAllAuthors())

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

      dispatch({ type: NEW_ARTICLE_RESET });

  }, [dispatch, error, success]);

  const submitHandler = e => {
    e.preventDefault();
    const article = {
      title,
      body,
      authorId
    };
    dispatch(newArticle(article));
    toast.success('Article created successfully');
    setIsOpen(false);
    setTitle("")
    setBody("")
  };

  const handleMoreActions = (id) => {
    console.log(id, "id")
    navigate(`/${id}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'authorName', headerName: 'Written By', flex: 1},
    { field: 'title', headerName: 'Title', flex: 2 },
    {
      field: 'more',
      headerName: 'Read More',
      sortable: false,
      renderCell: ({ row }) => (
          <IconButton onClick={() => handleMoreActions(row.id)}>
          <MoreHorizIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Article" subTitle="Managing Articles" />
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
      >
        Create Article
      </Button>
      <div style={{ textAlign: 'center' }}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            <IconButton onClick={() => setIsOpen(false)} style={{ float: 'right' }}>
              <CloseIcon color="primary" />
            </IconButton>
            Create Article
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} />
              {/* Replace TextField with TextareaAutosize */}
              <TextareaAutosize
                rowsMin={5}
                placeholder="Body"
                value={body}
                onChange={e => setBody(e.target.value)}
                style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
              />
              <Select
                labelId="author-select-label"
                id="author-select"
                label="Select Author"
                value={authorId}
                onChange={e => setAuthorId(e.target.value)}
              >
                {authors.map(author => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={submitHandler}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box m="10px 0 0 0">
        <DataGrid rows={articles} columns={columns} />
      </Box>
    </Box>
  );
};

export default Article;
