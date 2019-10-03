import React, { Component } from 'react';

import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import NewQuestion from "./components/NewQuestion";
import Container from "react-bootstrap/Container";
import LeaderBoard from "./components/LeaderBoard";
import Vote from "./components/Vote";
import Home from "./components/Home";
import { handleInitialData } from "./actions/shared";
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { BrowserRouter, Route} from "react-router-dom";


class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <BrowserRouter>
                <NavBar/>
                <LoadingBar />
                <br/>
                <Container>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/view/question/:question_id' exact component={Vote}/>
                    <Route path='/new/question' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={LeaderBoard} />
                </Container>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App);
