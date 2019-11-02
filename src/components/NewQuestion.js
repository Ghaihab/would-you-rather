import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {handleSaveQuestion} from "../actions/questions";
import {withRouter} from "react-router-dom";
import {handleGetUsers} from "../actions/shared";

class NewQuestion extends Component {
    constructor(props){
        super(props);

        this.state = {
            optionOneText: '',
            optionTwoText: '',
        }
    }
    render() {

        return (
            <Card border="dark" style={{ width: '100%' }}>
                <Card.Header>Create New Question</Card.Header>
                <Card.Body>
                    <Card.Title className='text-center'>Would You Rather</Card.Title>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Option One"
                                onChange={(event) => this.setState({optionOneText: event.target.value})}
                            />
                        </Form.Group>
                        <hr/>
                        <Form.Group >
                            <Form.Control
                                type="text"
                                placeholder="Option Two"
                                onChange={(event) => this.setState({optionTwoText: event.target.value})}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            onClick={() => this.saveQuestion() }
                        >
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }

    saveQuestion = () => {
        const {
            optionOneText,
            optionTwoText
        } = this.state;
        const { authedUser } = this.props;

        this.props.dispatch(handleSaveQuestion(optionOneText, optionTwoText, authedUser.id));
        this.props.dispatch(handleGetUsers());

        this.props.history.push({
            pathname: '/home'
        });

    }
}

function mapStateToProps({ authedUser, questions}){
    return {
        authedUser,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
