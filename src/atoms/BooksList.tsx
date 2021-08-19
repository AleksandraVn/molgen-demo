import React from 'react';
import {GetAllBooksQuery} from "../generated/types";
import {Grid, List, ListItem} from "@material-ui/core";

export interface BooksListProps {
    books: GetAllBooksQuery;
}

export const BooksList = (props: BooksListProps) => {
    return <Grid item xs={6}>
        <List>
            <h2>Books List</h2>
            {props.books?.getAllBooks.map((book, index) =>
                <ListItem key={index}>{book?.title}</ListItem>
            )
            }
        </List>
    </Grid>

}
export default BooksList;