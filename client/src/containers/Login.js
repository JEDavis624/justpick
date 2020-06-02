import React, { Component } from 'react';
import { Button, Panel, Alert } from 'react-bootstrap';
import FieldGroup from '../components/FieldGroup';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import MainJumbotron from '../components/Jumbotron';
import API from '../utils/API';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            badLogin: false
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleLogin = event => {
        event.preventDefault();
        console.log(`Logging in ${this.state.email} with password ${this.state.password}`);
        const { email, password } = this.state;
        console.log(email, password);
        API.login({ email, password })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.props.setAuth(true, res.data);
                    this.props.history.push("/");
                }
            })
            .catch((e) => {
                console.log(e);
                this.setState({ badLogin: true })
            });
    };

    render() {
        return (
            <div>
            <MainJumbotron />
            <Row>
                <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={4}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>Log in</Panel.Heading>
                        <Panel.Body>
                            <form>
                                <FieldGroup
                                    name="email"
                                    type="email"
                                    label="Email address"
                                    placeholder="Enter your email address"
                                    onChange={this.handleInputChange}
                                />
                                <FieldGroup
                                    name="password"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                    onChange={this.handleInputChange}
                                />
                                {
                                    this.state.badLogin &&
                                    <Alert bsStyle="danger">
                                        <p>Invalid Credentials</p>
                                    </Alert>
                                }
                                <Button 
                                    type="submit" 
                                    bsStyle="primary" 
                                    onClick={this.handleLogin}
                                    block
                                >
                                    Log in
                                </Button>
                            </form>
                        </Panel.Body>
                        <Panel.Footer style={{textAlign: 'center'}}>
                            <LinkContainer to={"/createaccount"}><a>Don't have an account? Create one!</a></LinkContainer>
                        </Panel.Footer>
                    </Panel>
                </Col>
            </Row>
            </div>
        );
    }
}

export default withRouter(Login);