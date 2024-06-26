// 'use client';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {IBook} from "@/models/books.model";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useState} from "react";
import {createPortal} from "react-dom";
import ChangeBook from "@/components/Books/ChangeBook";
import useSWR, {useSWRConfig} from "swr";
import {BOOK_API} from "@/constants/constants";
import {customFetcher} from "@/helpers/fetcher";
import {toast} from "react-toastify";

export default function Book(book: IBook) {
  const [showBookDesc, setShowBookDesc] = useState(false);
  const [showBookChangeModal, setShowBookChangeModal] = useState(false);
  // const { mutate } = useSWRConfig();
  const { mutate } = useSWR(BOOK_API, customFetcher);

  const deleteBook = async () => {
    try {
      await mutate(customFetcher(BOOK_API + `/${book.id}`,
        {method: "DELETE"},
        )
      )
      toast.success("Item removed successfully!");
    } catch (e) {
      toast.error("Item has not been removed!");
    }
  }

  return (
    <>
      {
        showBookChangeModal && createPortal(
          <ChangeBook book={book} onClose={() => setShowBookChangeModal(false)} setShowBookChangeModal={setShowBookChangeModal}/>,
          document.body
        )
      }
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            Author: {book.author}
          </Typography>
          {
            showBookDesc &&
            <Typography variant="body2" color="text.secondary">
              <Typography variant="subtitle2" color="text.secondary">Description:</Typography>
              {book.description}
            </Typography>
          }
        </CardContent>
        <CardActions>
          <IconButton aria-label="show" title="show" size="large" onClick={() => setShowBookDesc(prevState => !prevState)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton aria-label="edit" title="edit" size="large" onClick={() => setShowBookChangeModal(prevState => !prevState)}>
            <EditNoteIcon />
          </IconButton>
          <IconButton aria-label="delete" title="delete" color="error" size="large" onClick={deleteBook}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
