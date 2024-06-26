import style from "./Empty.module.css";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
const Empty = () => {
  return (
    <article className={style.emptyLayout}>
      <div className={style.emptyContent}>
        <LibraryBooksIcon />
        <p>No books yet...</p>
      </div>
    </article>
  );
};

export default Empty;
