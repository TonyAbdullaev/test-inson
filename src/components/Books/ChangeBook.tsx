'use client';
import style from "./ChangeBook.module.css"
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import AddBookForm from "@/app/add-book/AddBookForm";
import {IBook} from "@/models/books.model";
import {Dispatch, SetStateAction} from "react";
interface IChangeBookModal {
  onClose: () => void;
  book: IBook;
  setShowBookChangeModal:  Dispatch<SetStateAction<boolean>>;
}

const ChangeBookModal = ({ onClose, book, setShowBookChangeModal }: IChangeBookModal) => {
  return (
    <div className={style.changeModalLayout} onClick={onClose}>
      <div className={style.changeModalLayoutContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.changeModalHeader}>
          <IconButton className={style.closeBtn} aria-label="show" title="show" size="large" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={style.changeModalBody}>
          <AddBookForm book={book} setShowBookChangeModal={setShowBookChangeModal} />
        </div>
      </div>
    </div>
  );
};

export default ChangeBookModal;
