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
                        <p> JustPick - a web application will allow individuals to form teams, set times and find locations to play.Creating a pick up game, for any sport, is difficult to orchestrate and requires one to personally know a lot of individuals that are interested in the same sport as them. This requires several people to find a mutually agreeable time and location to play games. Some people do not have the time to commit to a league and are only able to play every once in a while.
                            As an athlete, I want to provide other athletes with the ability to easily organize pick up games for any sport, so athletes can connect with other athletes in their area. I also want to give other athletes a chance to feel like they are actually playing for something important and not just playing for fun. </p>
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
                            <p id="autobio">Jariel is the resident back-end expert of JustPick. If a route needs an endpoint or a database needs a schema - Jariel is your man. He has gone to great lengths to make sure the user experience is seamless from start to finish. Jariel's ability to solve complex problems for JustPick has shown through time and time again.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h3 className="aboutUsHeaders"> Mesut Sipar </h3>
                        <img id="avatar" src="/images/mesut.png" alt="Mesut Sipar"></img>
                        <p id="autobio">Mesut is the ultimate utility man. The next time you successfully book a lesson - make sure to send a kind note Mesut's way - because that lesson would never have been possible without his blood, sweat and tears poured out over the calendar system currently in place for JustPick. And oh by the way - he can make a mean wireframe as well.</p>
                    </Col>
                    <Col md={4}>
                        <h3 className="aboutUsHeaders"> John Davis </h3>
                        <img id="avatar" src="/images/john.jpg" alt="John Davis"></img>
                        <p id="autobio">John Davis is the cleanup man of the crew. He was primarily responsible for the look & feel of ParTee as well as it's overall goals and mission. Don't forget that everytime you upload a mugshot of yourself to your profile - Clarke holds all the records in his Cloudinary database - choose wisely! </p>
                    </Col>
            
                </Row>
            </div>
        )

    }
}

export default AboutUs;