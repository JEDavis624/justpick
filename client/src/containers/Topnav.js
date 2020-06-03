import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import API from '../utils/API';

class Topnav extends Component {

    logout = () => {
        API.logout().then(() => {
            this.props.history.push("/");
            this.props.setAuth(false, null);
        })
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <LinkContainer to={'/'}>    
                        <Navbar.Brand>
                            <Image id="logo" src="/images/logo.png"/>
                        </Navbar.Brand>
                    </LinkContainer>
                </Navbar.Header>
                <Nav>
                    <LinkContainer to={"/"} exact={true}><NavItem>Home</NavItem></LinkContainer>
                    {/* <LinkContainer to={"/about"} exact={true}><NavItem>About</NavItem></LinkContainer> */}
                </Nav>
                {this.props.authenticated ? (
                    <Nav pullRight>
                        <NavItem onSelect={this.logout}>
                            Log Out
                        </NavItem>    
                        <LinkContainer to={"/pro"}><NavItem>Profile <Glyphicon glyph="user" /></NavItem></LinkContainer>
                    </Nav>
                ) : (
                    <Nav pullRight>
                        <LinkContainer to={"/login"}><NavItem>Log In</NavItem></LinkContainer>
                        <LinkContainer to={"/createaccount"}><NavItem>Create Account</NavItem></LinkContainer>
                        
                    </Nav>
                )}
            </Navbar>
        );
    }
}

export default withRouter(Topnav);