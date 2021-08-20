import React, {useEffect} from 'react';
import {BookInput, GetOneBookByIdQuery} from "../generated/types";
import {Button, Grid, TextField} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";

export interface BookFormComponentProps {
    onSave: (data: BookInput) => void;
    book: GetOneBookByIdQuery | null;
}

export const BookFormComponent = (props: BookFormComponentProps) => {

    const {reset, handleSubmit, control} = useForm<BookInput>();
    const {book, onSave} = props;

    const onSubmit = (input: BookInput) => {
        console.log("On submit");
        console.log(input);
        onSave(input);
        reset();
    }

    useEffect(() => {
        if (book !== null && book !== undefined) {
            reset({
                title: book.getBookById?.title!,
                authorId: book.getBookById?.authors[0]?.id!
            });
        } else {
            reset();
        }
    }, [book, reset]);

    return <Grid item xs={6}>
        {
            book !== null &&
            <h4>Fetched book: {book?.getBookById?.title} </h4>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="title"
                        defaultValue={""}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                            <TextField
                                id="title"
                                label="Book title"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name="authorId"
                        defaultValue={""}
                        render={({field: {onChange, onBlur, value, ref}}) => (
                            <TextField
                                id="authorId"
                                label="Author ID"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Grid>
}
export default BookFormComponent;