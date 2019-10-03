import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import WouldYouRather from './WouldYouRather'
import { FaSignOutAlt } from 'react-icons/fa';
import Image from "react-bootstrap/Image";
import connect from "react-redux/es/connect/connect";
import {NavLink, Redirect} from 'react-router-dom';
import { logoutUser } from "../actions/authedUser";


class NavBar extends Component {
    render() {
        if(! this.props.authedUser){
            return <Redirect to='/' /> ;
        }
        return (
            <div>
                <Navbar style={{backgroundColor: '#233045'}}>
                    <Navbar.Brand href="#home">
                        <WouldYouRather />
                    </Navbar.Brand>
                    { this.props.authedUser ? <React.Fragment>
                    <Nav className="mr-auto">
                                <NavLink to='/home' exact>
                                    <h4 style={{color: '#dfdfdf'} }>Home  | </h4>
                                </NavLink>
                                <NavLink to='/new/question'>
                                    <h4 style={{color: '#dfdfdf'}}>New Question  |</h4>
                                </NavLink>
                                <NavLink to='/leaderboard'>
                                    <h4 style={{color: '#dfdfdf'}}>Leader Board</h4>
                                </NavLink>
                    </Nav>

                        <Image src={`${this.props.authedUser.avatarURL}`} width={80} height={80} style={{ marginRight: '30px'}} roundedCircle/>
                        <Nav className="mr-auto">
                            <h5 style={{color: '#dfdfdf'} }>Hello, {`${this.props.authedUser.name}`} </h5>
                        </Nav>
                        <Nav>
                            <Button style={{backgroundColor: '#43c4c7', borderColor: '#dfdfdf'}} size="lg" onClick={this.logout}>
                                Logout <FaSignOutAlt  />
                            </Button>
                        </Nav>
                    </React.Fragment>: null}

                </Navbar>
            </div>
        );
    }

    logout = () => {
        this.props.dispatch(logoutUser());
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NavBar);
