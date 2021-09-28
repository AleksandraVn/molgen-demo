import molgenGenerate, {Atom, Molecule} from "molgen";
import BooksList, {BooksListProps} from "../src/atoms/BooksList";
import {
    useCreateBookMutation,
    useGetAllBooksQuery,
    useGetOneBookByIdQuery,
    useUpdateBookMutation
} from "../src/generated/types";
import BookFormComponent, {BookFormComponentProps} from "../src/atoms/BookFormComponent";
import {useGetBookIdHook} from "../src/hooks/useGetBookId.hook";
import GridContainer from "../src/containers/GridContainer";
import React from "react";
import {AtomProperty} from "molgen/dist/internalDsl/metamodel";

const createAtom = <TComponent  extends  React.FunctionComponent | ((props: any) => JSX.Element)>(component: TComponent, props: AtomProperty<Parameters<TComponent>[0]>[]): Atom<TComponent> =>({

    component,
        props
})

const booksListAtom =
    createAtom(BooksList, [
        {
            name: "books",
            input: useGetAllBooksQuery
        }
    ]);

const createBookAtom : Atom< typeof BookFormComponent>= {
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

type VarInput<TProps extends {}> = VarInputHook<TProps, any>|{type: "prop", name: keyof TProps}
type VarInputHook<TProps extends {}, InputType extends ((options?: any)=>any) > =
    {type: "hook", input: null |InputType , transform: (result: ReturnType<InputType>)=>any}

const hookInput : VarInputHook<{id: number}, ()=>{id: number}> = {type: "hook",input: ()=>{return {id: 1}},transform: (data)=>data.id}
const id : VarInput<{id: number}> = {type: "prop", name: "id"}

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
    ["../src/*/atoms/*.tsx"],
    ["../src/containers/*.tsx"],
    ["../src/mutations/*.graphql", "../src/queries/*.graphql"],
    ["../src/hooks/*.ts"],
    "../src/generated/*.ts"
).catch(err => {
    throw err
});