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
import {
    BrowserRouter,
    Route,
    Switch
} from "react-router-dom";

const ErrorPage = ({ location }) => {
    return <div>
        <h3>Error, no match for <code>{ location.pathname }</code></h3>
    </div>
}

const NeedToLogin = () => {
    return <div>
        <h3>You need to login to use application features !</h3>
    </div>
}

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            authedUser: props.authedUser
        }

    }

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    render() {
        let { authedUser } = this.props;

        return (
            <BrowserRouter>
                <NavBar/>
                <LoadingBar />
                <br/>
                <Container>
                    <Switch>
                        <Route path={'/'} exact component={LoginPage} />

                        <Route path={'/home'} exact render={() => (
                                authedUser ? <Home/> : <NeedToLogin/>
                        )}/>

                        <Route path={'/question/:question_id'} exact render={(props) => (
                                authedUser ? <Vote {...props} /> : <NeedToLogin/>
                        )}/>

                        <Route path={'/add'} exact render={() => (
                                authedUser ? <NewQuestion/> : <NeedToLogin/>
                        )}/>

                        <Route path={'/leaderboard'} exact render={() => (
                                authedUser ? <LeaderBoard/> : <NeedToLogin/>
                        )}/>

                        <Route component={ErrorPage}/>
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ authedUser }){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(App);
