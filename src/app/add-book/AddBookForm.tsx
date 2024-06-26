"use client"
import React, {Dispatch, SetStateAction} from 'react';
import Box from "@mui/material/Box";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {IBook} from "@/models/books.model";
import useSWR from "swr";
import {BOOK_API, HOME_PAGE} from "@/constants/constants";
import {customFetcher} from "@/helpers/fetcher";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import axios from "axios";


const initialValue = {
  title: '',
  author: '',
  genre: '',
  description: '',
}

interface IAddBookForm {
  book?: IBook,
  setShowBookChangeModal:  Dispatch<SetStateAction<boolean>>,
}
const AddBookForm: React.FC<IAddBookForm> = ({book, setShowBookChangeModal}) => {
 // const { mutate } = useSWRConfig();
  const { mutate } = useSWR(BOOK_API, customFetcher);
  const router = useRouter()
  const handleSubmit = async (bookData: IBook) => {
    try {
      await mutate(customFetcher(BOOK_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(bookData),
      }));
      toast.success("Item add successfully!")
    } catch (e) {
      toast.error("Can not add item, try latter!")
    }
  };

  const changeBook = async ({currentBook, changedValues}: {currentBook: IBook, changedValues: IBook}) => {
    try {
      await axios.put(`${BOOK_API}/${currentBook.id}`, changedValues);
      await mutate();
      toast.success("Item add successfully!")
    } catch (e) {
      toast.error("Can not add item, try latter!")
    }
    return setShowBookChangeModal(false)
  }

  const formik = useFormik({
    initialValues: book || initialValue,
    onSubmit: async (values) => {
      if (book) {
        await changeBook({currentBook: book, changedValues: values})
      } else {
        await handleSubmit(values)
      }
      router.push(HOME_PAGE)
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        required
        id="title"
        label="Title"
        variant="outlined"
        value={formik.values.title}
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        required
        id="author"
        label="Author"
        variant="outlined"
        value={formik.values.author}
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        required
        id="genre"
        label="Genre"
        variant="outlined"
        value={formik.values.genre}
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        required
        id="description"
        label="Short Description"
        variant="outlined"
        multiline
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default AddBookForm;
