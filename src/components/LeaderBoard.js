import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";

class UserScore extends Component {
    render() {
        return (
            <CardColumns>
                <Card bg="info">
                    <Card.Img variant="top" src="/wouldYouRather.png" height={250}/>
                    <hr/>
                    <Card.Body>
                        <Card.Title className='text-center'>Ghaihab Almuhanna</Card.Title>
                        <hr/>
                        <Card.Text className='text-center'>
                           <p>Answered Questions: <b>10</b></p>
                            <p>Created Questions: <b>20</b></p>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted text-center"><h4>Score: 30</h4> </small>
                    </Card.Footer>
                </Card>
            </CardColumns>
        );
    }
}

export default UserScore;
