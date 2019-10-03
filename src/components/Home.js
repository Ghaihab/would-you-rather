import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import CardColumns from "react-bootstrap/CardColumns";
import { connect } from 'react-redux';
import {NavLink, Redirect} from "react-router-dom";
import {
    getAnsweredQuestions,
    getUnAnsweredQuestions
} from "../actions/questions";

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: ''
        }
    }

    render() {

        if(! this.props.authedUser){
            return <Redirect to='/' /> ;
        }

        return (
            <Card className="text-center">
                <Card.Header>
                    <ButtonGroup size="lg">
                        <Button onClick={this._getUnAnsweredQuestions} active={this.state.show === 'unanswered_questions'}>Unanswered Questions</Button>
                        <Button onClick={this._getAnsweredQuestions} active={this.state.show === 'answered_questions'}>Answered Questions</Button>
                    </ButtonGroup>

                </Card.Header>
                <Card.Body>
                    <CardColumns>
                        {this.getQuestions().map((question) => {
                            return <Card key={question.id}>
                                <Card.Img variant="top" src={this.props.users.find((user)=> question.author === user.id).avatarURL} height={250}/>
                                <hr/>
                                <Card.Body>
                                    <Card.Title className='text-center'>{question.author}</Card.Title>
                                    <hr/>
                                    <Card.Text className='text-center'>
                                        {Home.showSmallDescription(question.optionOne.text)}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted text-center">
                                            <NavLink exact to={`/view/question/${question.id}`}>
                                                <Button type="submit" value="View poll">
                                                   View poll
                                                </Button>
                                            </NavLink>
                                    </small>
                                </Card.Footer>
                            </Card>
                        })}
                    </CardColumns>
                </Card.Body>
            </Card>
        );
    }

    static showSmallDescription(value){
        return value.substring(0,20) + '...';
    }

    getQuestions = () => {

        if(this.state.show === 'answered_questions'){
            return Object.values(this.props.questions.answered_questions);
        }

        if(this.state.show === 'unanswered_questions'){
            return Object.values(this.props.questions.unanswered_questions);
        }

        return Object.values(this.props.questions.all);
    }


    _getUnAnsweredQuestions = () => {
        this.props.dispatch(getUnAnsweredQuestions(this.props.authedUser, this.props.questions.all));
        this.setState({show: 'unanswered_questions'});
    }


    _getAnsweredQuestions = () => {
        this.props.dispatch(getAnsweredQuestions(this.props.authedUser, this.props.questions.all));
        this.setState({show: 'answered_questions'});
    }

}

function mapStateToProps({ authedUser, questions, users }){

    return {
        authedUser,
        questions,
        users: Object.keys(users).map((key) => { return users[key]})
    }
}

export default connect(mapStateToProps)(Home);
