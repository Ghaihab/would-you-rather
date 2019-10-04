import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { connect } from 'react-redux'
import { FaTrophy } from "react-icons/all";
class LeaderBoard extends Component {
    render() {
        return (
            <CardColumns>
                {this.props.winner ? <Card>
                    <div align='center'>
                        <FaTrophy size={100} color={'#D4AF37'} />
                    </div>
                    <Card.Img variant="top" src={this.props.winner.avatarURL} height={250}/>
                    <hr/>
                    <Card.Body>
                        <Card.Title className='text-center'>{this.props.winner.name}</Card.Title>
                        <hr/>
                        <Card.Text className='text-center'>
                            Answered Questions: {Object.values(this.props.winner.answers).length}
                            <br/>
                            Created Questions: {Object.values(this.props.winner.questions).length}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted text-center">
                            <div>
                                Score: {Object.values(this.props.winner.answers).length + Object.values(this.props.winner.questions).length}
                            </div>
                        </small>
                    </Card.Footer>
                </Card> : <React.Fragment />}

                {this.props.users.map((user) =>  {
                    return <Card key={user.id}>
                        <div align='center'>
                            <FaTrophy size={100} color={'#BEC2CB'} />
                        </div>
                        <Card.Img variant="top" src={user.avatarURL} height={250}/>
                        <hr/>
                        <Card.Body>
                            <Card.Title className='text-center'>{user.name}</Card.Title>
                            <hr/>
                            <Card.Text className='text-center'>
                                Answered Questions: {Object.values(user.answers).length}
                                <br/>
                                Created Questions: {Object.values(user.questions).length}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted text-center">
                                <div>
                                    Score: {Object.values(user.answers).length + Object.values(user.questions).length}
                                </div>
                            </small>
                        </Card.Footer>
                    </Card>
                })}


            </CardColumns>
        );
    }
}

function mapStateToProps({ users }){
    let _users = Object.values(users);
    let winner = _users[0];

    _users.forEach((user) => {
        let winnerScore = Object.values(winner.answers).length + Object.values(winner.questions).length;
        let nextUserScore = Object.values(user.answers).length + Object.values(user.questions).length;
       if(nextUserScore > winnerScore){
           winner = user;
       }
    });

    users = _users.filter((user) => {
        return user.id !== winner.id;
    }).sort(function(user, nextUser) {
        let userScore = Object.values(user.answers).length + Object.values(nextUser.questions).length;
        let nextUserScore = Object.values(nextUser.answers) + Object.values(nextUser.questions).length;
        if (userScore > nextUserScore){
            return 1;
        }
        return -1;
    });

    return {
        users,
        winner
    }
}

export default connect(mapStateToProps)(LeaderBoard);
