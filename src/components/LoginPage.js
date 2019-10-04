import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import WouldYouRather from "./WouldYouRather";
import {DropdownButton, Dropdown} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { loginUser } from "../actions/authedUser";
import Image from "react-bootstrap/Image";
import { Redirect } from 'react-router-dom'
import { handleGetQuestions } from "../actions/shared";

class LoginPage extends Component {
    render() {
        if(this.props.authedUser){
            return <Redirect to={{
                pathname: "/home",
            }} /> ;
        }
        return (
            <div>
                <Container>
                    <Card className="text-center">
                        <Card.Header>
                            <WouldYouRather />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>Welcome to would you rather</Card.Title>
                            <Card.Text>
                                give people two options to choose from. One is free to choose any of the options and each option has its own value. The idea is to get a glimpse into what inspires our life choices and values.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <ButtonGroup>
                                <DropdownButton id="dropdown-item-button" title="Login as" >
                                        {
                                            this.props.users.map((user) => {
                                                return <Dropdown.Item as="button" key={user.name} onClick={this.loginUser}>
                                                    <Image src={`${user.avatarURL}`} width={80} height={80} roundedCircle/>
                                                    <h5>{`${user.name}`}</h5>
                                                </Dropdown.Item>
                                            })
                                        }
                                </DropdownButton>
                            </ButtonGroup>

                        </Card.Footer>
                    </Card>
                </Container>
            </div>
        );
    }

    loginUser = (event) => {
        let username = event.currentTarget.textContent;
        let user = this.props.users.find((user) => {return user.name === username});
        this.props.dispatch(handleGetQuestions(user));
        this.props.dispatch(loginUser(user));
    }
}


function mapStateToProps({ users, authedUser }) {
    return {
        users: Object.values(users),
        authedUser
    }
}

export default connect(mapStateToProps)(LoginPage);
