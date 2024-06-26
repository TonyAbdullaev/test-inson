"use client"
import styles from "./page.module.css";
import Book from "@/components/Books/Book";
import {Grid} from "@mui/material";
import useSWR, {SWRResponse} from "swr";
import {customFetcher} from "@/helpers/fetcher";
import {BOOK_API} from "@/constants/constants";
import {IBook} from "@/models/books.model";
import Empty from "@/components/Errors/Empty";
import React from "react";

export default function Home() {
  const { data, error }:SWRResponse = useSWR(BOOK_API, customFetcher);

  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }

  if (!data) return <div>Loading...</div>;

  const books = data || [];
  return (
    <main className={styles.main}>
      <h2>Home Page</h2>
      <Grid container spacing={2} className={styles.bookListWrapper}>
        {
          books.length < 1 ? (<Empty />) :
            books.map((book: IBook) => (
                <Grid item xs={12} md={4} sm={6} key={book.id} >
                  <Book {...book} />
                </Grid>
              )
            )
        }
      </Grid>
    </main>
  );
}
