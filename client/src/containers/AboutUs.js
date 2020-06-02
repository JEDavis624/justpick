import React, { Component } from 'react';
import MainJumbotron from '../components/Jumbotron';

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
                        <p>JustPick - a web application will allow individuals to form teams, set times and find locations to play.Creating a pick up game, for any sport, is difficult to orchestrate and requires one to personally know a lot of individuals that are interested in the same sport as them. This requires several people to find a mutually agreeable time and location to play games. Some people do not have the time to commit to a league and are only able to play every once in a while.
                            As an athlete, I want to provide other athletes with the ability to easily organize pick up games for any sport, so athletes can connect with other athletes in their area. I also want to give other athletes a chance to feel like they are actually playing for something important and not just playing for fun. </p>
                    </Col>
                        <Col md={1}></Col>
                </Row>

                <Row>
                    <h3 className="aboutUsHeaders">Meet the team</h3>
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