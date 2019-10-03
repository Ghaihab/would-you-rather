import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";
import { FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import ProgressBar from "react-bootstrap/ProgressBar";
import { connect } from 'react-redux';
import {handleVote} from "../actions/questions";


class ResultVote extends Component {
    constructor(props){
        super(props);

        const backgroundColors = {
                default: '#e2e2e2',
                red: '#ba2140',
                black: '#233045'
        }
    }

    render() {
        const {
            question,
            user,
            answer
        } = this.props;

        return (
            <Card className="text-center">
                <Card.Header>
                    <Image src={user.avatarURL} width={80} height={80} style={{ marginRight: '30px'}} roundedCircle/>
                    <h3>Asked by {question.author}</h3>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        {answer ? 'You have answered the question' : 'Click on the card to vote'}
                    </Card.Title>
                    <Card.Text>
                        <CardDeck>
                            <Card text="white" style={
                                { width: '18rem', backgroundColor: `${this.showCardStyle('optionOne')}` }
                            }>
                                <Card.Header>
                                    {this.showIcon('optionOne')}
                                </Card.Header>
                                <Card.Body as='Button' onClick={() => this.vote('optionOne')}>
                                    <Card.Title>{question.optionOne.text}</Card.Title>
                                    <Card.Text>
                                        {this.showVoteResult('optionOne')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card text="white" style={
                                { width: '18rem', backgroundColor: `${this.showCardStyle('optionTwo')}` }
                            }>
                                <Card.Header>
                                    {this.showIcon('optionTwo')}
                                </Card.Header>
                                <Card.Body as='Button' onClick={() => this.vote('optionTwo')}>
                                    <Card.Title>{question.optionTwo.text}</Card.Title>
                                    <Card.Text>
                                        {this.showVoteResult('optionTwo')}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </CardDeck>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }

    vote = (answerOption) => {

        const {
            authedUser,
            question,
            answer
        } = this.props;

        if(answer){
            return;
        }

        this.props.dispatch(handleVote(authedUser, question, answerOption));
    }

    showCardStyle = (option) => {
        const { answer } = this.props;
        return answer ? answer === option ? '#ba2140' :'#233045': '#e2e2e2'
    }

    showIcon = (option) => {
        const { answer } = this.props;
        return answer ? answer === option ? <FaCheckCircle/> : <FaRegTimesCircle/> : null
    }

    showVoteResult = (option) => {
        const { optionOne, optionTwo } = this.props.question;
        let optionOneCount = optionOne.votes.length;
        let optionTwoCount = optionTwo.votes.length;
        let totalCount = optionOneCount + optionTwoCount;
        let percentage = Math.round((option === 'optionOne' ? optionOneCount: optionTwoCount) / totalCount * 100);
        if (totalCount === 0){
            percentage = 0;
        }
        return <React.Fragment>
            <ProgressBar now={percentage} label={`${percentage}%`} />
            <p>{`${ option === 'optionOne' ? optionOneCount: optionTwoCount} votes out of ${totalCount}`}</p>
        </React.Fragment>
    }


}

function mapStateToProps({ questions, users, authedUser }, props) {
    let question_id = props.match.params.question_id;

    let question = Object.values(questions.all).find((question) => {
        return question.id === question_id;
    });

    let user = Object.values(users)
        .map((value) => {return value})
        .find((user) => { return user.id === question.author });

    let answer = authedUser.answers[question_id];

    return {
        question,
        user,
        authedUser,
        answer
    }

}

export default connect(mapStateToProps)(ResultVote);
