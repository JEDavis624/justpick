import React, { Component } from 'react';
import MainJumbotron from '../components/Jumbotron';
import { Row, Col } from 'react-bootstrap';

class AboutUs extends Component {

    render() {
        return(
            <div>
                <MainJumbotron />

                <Row>
                    <h2 className="aboutUsHeaders">About Us</h2>
                </Row>

                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <p></p>
                    </Col>
                        <Col md={1}></Col>
                </Row>

                <Row>
                    <h2 className="aboutUsHeaders">Meet the team</h2>
                </Row>

                <Row>
                    
                    <Col md={4}>
                        <div>
                            <h3 className="aboutUsHeaders"> Jariel Brown </h3>
                            <img id="avatar" src="/images/jariel.jpg" alt="Jariel Brown"></img>
                            <p id="autobio"></p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h3 className="aboutUsHeaders"> Mesut Sipar </h3>
                        <img id="avatar" src="/images/mesut.png" alt="Mesut Sipar"></img>
                        <p id="autobio"></p>
                    </Col>
                    <Col md={4}>
                        <h3 className="aboutUsHeaders"> John Davis </h3>
                        <img id="avatar" src="/images/john.jpg" alt="John Davis"></img>
                        <p id="autobio"></p>
                    </Col>
            
                </Row>
            </div>
        )

    }
}

export default AboutUs;
