import React, { Component } from 'react';

import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import NewQuestion from "./components/NewQuestion";
import Container from "react-bootstrap/Container";
import LeaderBoard from "./components/LeaderBoard";
import Vote from "./components/Vote";
import Home from "./components/Home";
import { handleGetUsers } from "./actions/shared";
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Route} from "react-router-dom";


class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    render() {
        return (
            <BrowserRouter>
                <NavBar/>
                <LoadingBar />
                <br/>
                <Container>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/home' component={Home} />
                    <Route path='/vote/question/:question_id' component={Vote}/>
                    <Route path='/new/question' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                </Container>
            </BrowserRouter>
        );
    }
}

export default connect()(App);
