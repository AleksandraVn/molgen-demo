import React from 'react';
import './App.css';
import {Grid} from "@material-ui/core";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import DisplayBooksComponent from "./molgenGenerated/DisplayBooksComponent";
import CreateBookComponent from "./molgenGenerated/CreateBookComponent";
import UpdateBookComponent from "./molgenGenerated/UpdateBookComponent";

function App() {
    return (
        <div className="App">
            <Router>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Link to={"/"}>Home</Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={"/books"}>Books</Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={"/books/create"}>Create</Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Link to={"/books/edit/1"}>Edit</Link>
                    </Grid>
                </Grid>
                <Route path="/"/>
                <Route path="/books" exact component={DisplayBooksComponent}/>
                <Route path="/books/create" exact component={CreateBookComponent}/>
                <Route path="/books/edit/1" exact component={UpdateBookComponent}/>
            </Router>
        </div>
    );
}

export default App;
