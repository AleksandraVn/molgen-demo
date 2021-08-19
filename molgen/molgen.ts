import molgenGenerate, {Atom, Molecule} from "molgen";
import BooksList from "../src/atoms/BooksList";
import {
    useCreateBookMutation,
    useGetAllBooksQuery,
    useGetOneBookByIdQuery,
    useUpdateBookMutation
} from "../src/generated/types";
import BookFormComponent from "../src/atoms/BookFormComponent";
import {useGetBookIdHook} from "../src/hooks/useGetBookId.hook";
import GridContainer from "../src/containers/GridContainer";


const booksListAtom: Atom = {
    component: BooksList,
    props: [
        {
            name: "books",
            input: useGetAllBooksQuery
        }
    ]
}

const createBookAtom = {
    component: BookFormComponent,
    props: [
        {
            name: "onSave",
            input: useCreateBookMutation
        },
        {
            name: "book",
            input: null
        },
    ]
}

const updateBookAtom = {
    component: BookFormComponent,
    props: [
        {
            name: "onSave",
            input: useUpdateBookMutation,
            variables: [
                {
                    "id": useGetBookIdHook
                }
            ]
        },
        {
            name: "book",
            input: useGetOneBookByIdQuery,
            variables: [
                {
                    "id": useGetBookIdHook
                }
            ]
        },
    ]
}

export const molecules: Molecule[] = [
    {
        name: "CreateBookComponent",
        container: GridContainer,
        atoms: [booksListAtom, createBookAtom]
    },
    {
        name: "UpdateBookComponent",
        container: GridContainer,
        atoms: [updateBookAtom]
    },
    {
        name: "DisplayBooksComponent",
        atoms: [booksListAtom]
    }
]

molgenGenerate(
    molecules,
    ["../src/atoms/*.tsx"],
    ["../src/containers/*.tsx"],
    ["../src/mutations/*.graphql", "../src/queries/*.graphql"],
    ["../src/hooks/*.ts"],
    "../src/generated/*.ts"
);