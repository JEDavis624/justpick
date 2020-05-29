import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormGroup, ControlLabel, 
         Radio, Row, Col, Panel, Alert } from 'react-bootstrap';
import FieldGroup from '../components/FieldGroup';
import MainJumbotron from '../components/Jumbotron';
import API from '../utils/API';

export class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            isPro: false,
            badCreate: false,
            errorMsg: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAccountCreate = this.handleAccountCreate.bind(this);
    }

    handleInputChange (event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleAccountCreate (event) {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            isPro: this.state.isPro
        };
        API.createAccount(user)
        .then(res => {
            if (res.status === 200) {
                debugger;
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    isPro: false
                });
                this.props.setAuth(true, res.data.user);
                this.props.history.push("/pro");
            } else {
                console.log(res.data);
            }
        })
        .catch(err => {
            const errData = err.response.data;
            if (errData.message[0] && errData.message[0] === 'duplicate email'){
                this.setState({ errorMsg: "That email address is already in use" });
            } else {
                this.setState({ errorMsg: "You did something wrong.  Maybe fix that..."});
            }
            this.setState({ badCreate: true })
        });
    }

    render() {
        return (
            <div>

            <MainJumbotron />

                <Row>
                <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={4}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>Create an account</Panel.Heading>
                        <Panel.Body>
                            <form onSubmit={this.handleAccountCreate}>
                                <FieldGroup
                                    name="email"
                                    value={this.state.email}
                                    type="email"
                                    label="Email address"
                                    placeholder="Enter an email address"
                                    onChange={this.handleInputChange}
                                />
                                <FieldGroup
                                    name="password"
                                    value={this.state.password}
                                    type="password"
                                    label="Password"
                                    placeholder="Enter a password"
                                    help="Password must be at least 6 characters."
                                    onChange={this.handleInputChange}
                                />
                                <FieldGroup
                                    name="firstName"
                                    value={this.state.firstName}
                                    type="text"
                                    label="First name"
                                    placeholder="Enter your first name"
                                    onChange={this.handleInputChange}
                                />
                                <FieldGroup
                                    name="lastName"
                                    value={this.state.lastName}
                                    type="text"
                                    label="Last name"
                                    placeholder="Enter your last name"
                                    onChange={this.handleInputChange}
                                />
                                <FormGroup>
                                    <ControlLabel>Who are you?</ControlLabel>
                                    <Radio name="isPro" value="false" defaultChecked onChange={this.handleInputChange}>
                                        I'm here to learn.
                                    </Radio>
                                    <Radio name="isPro" value="true" onChange={this.handleInputChange}>
                                        I'm pro!
                                    </Radio>
                                </FormGroup>
                                {
                                    this.state.badCreate &&
                                    <Alert bsStyle="danger">
                                        <p>{this.state.errorMsg}</p>
                                    </Alert>
                                }
                                <Button 
                                    bsStyle="primary" 
                                    type="submit"
                                    block
                                >
                                    Create Account
                                </Button>
                            </form>
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'center'}}>
                            <LinkContainer to={"/login"}><a>I already have an account. I'd like to log in.</a></LinkContainer>
                        </Panel.Footer>
                    </Panel>
                </Col>
            </Row>
            </div>
        );
    }
}

export default withRouter(CreateAccount);