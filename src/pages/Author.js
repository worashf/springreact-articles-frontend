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
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import  {useNavigate} from "react-router-dom"
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tokens } from '../theme';
import Header from '../components/layouts/Header';
import { newAuthor, clearErrors,getAllAuthors,deleteAuthor, updateAuthor } from "../redux/actions/authorActions"


import { DELETE_AUTHOR_RESET, NEW_AUTHOR_RESET,UPDATE_AUTHOR_RESET} from "../redux/constants/authorConstants"

const Author = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail]  = useState("")
  const [age, setAge] = useState(0)

  const [selectedAuthor, setSelectedAuthor] = useState(null);
   const [id, setId]  = useState(0)
  const { loading, error, success } = useSelector(state => state.newAuthor)

  const {authors}  = useSelector(state => state.authors)
  const { isDeleted ,isUpdated} = useSelector(state => state.authorAction)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);






  useEffect(() => {
    dispatch(getAllAuthors())

    if (error) {
      toast.error(error);
      dispatch(clearErrors())
    }

    if (success) {
      toast.success('Author created successfully');
      dispatch({ type: NEW_AUTHOR_RESET })
    }

    if (isDeleted) {
      toast.success('Author deleted successfully');
      navigate("/authors")
      dispatch({ type: DELETE_AUTHOR_RESET })
  }
  if(isUpdated){
    toast.success('Author updated successfully');
    navigate("/authors")
    dispatch({ type: UPDATE_AUTHOR_RESET })
  }

  }, [dispatch, error, success,isDeleted,isUpdated])


  const submitHandler = (e) => {
    e.preventDefault();
   if(selectedAuthor){
    const updatedAuthor = {
      ...selectedAuthor,
      name,
      gender,
      age,
      email,
    };
  dispatch(updateAuthor(id, updatedAuthor))
  setIsOpen(false)
  }

  if(selectedAuthor  === null){
    const author = {
      name,
      gender,
      age,
      email
    }
    dispatch(newAuthor(author))
    setIsOpen(false)
    setName("")
    setAge(0)
    setGender("")
    setEmail("")
  }
  }


  const handleDelete = (authorId) => {
      dispatch(deleteAuthor(authorId));
  };

  const handleUpdate = (author) => {

    setName(author.name);
    setGender(author.gender);
    setEmail(author.email);
    setAge(author.age);
    setSelectedAuthor(author);
    setId(author.id)
    setIsOpen(true);
  };


  const columns = [

    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Author Name',      flex:1},

    {
      field: 'email', headerName: 'Email',

    },
    {
      field: 'gender', headerName: 'Gender', headerAlign: "left",

    },
    {
      field: 'age', headerName: 'Age', headerAlign: "left",

    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <IconButton onClick={() => handleUpdate(row)}>
            <EditIcon/>
          </IconButton>
        </>
      ),
    },



  ];


  return (
    <Box m="20px">
      <Header title="Author" subTitle="Managing Authors" />
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
      >
        Add Author
      </Button>
      <div style={{ textAlign: 'center' }}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>
            <IconButton onClick={() => setIsOpen(false)} style={{ float: 'right' }}>
              <CloseIcon color="primary" />
            </IconButton>
            Register Author
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <TextField label="Name" name="name" value={name} onChange={e=>setName(e.target.value)}/>
              <TextField label="Email" name="email"  value ={email} onChange={e=>setEmail(e.target.value)} />
              <TextField label="Age" name="age" value={age}  onChange={e=>setAge(e.target.value)}/>
              <Select
                labelId="gender-simple-select-label"
                id="gender-simple-select"
                label="Select an option"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={submitHandler}>Register</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box
        m="10px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {

            overflowY: "auto",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "#111",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#cdd4cf",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#ebf5ee",
          },
          "& .MuiDataGrid-footerContainer": {

            backgroundColor: "#cdd4cf",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },

        }}
      >
        <DataGrid rows={authors} columns={columns}  />
    </Box>
    </Box>
  );
};

export default Author;
