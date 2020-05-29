import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const AvailDisplay = (props) => (
    <ButtonGroup>
        <Button disabled={true} bsStyle={props.mon ? "primary" : "default"}>Mon</Button>
        <Button disabled={true} bsStyle={props.tue ? "primary" : "default"}>Tue</Button>
        <Button disabled={true} bsStyle={props.wed ? "primary" : "default"}>Wed</Button>
        <Button disabled={true} bsStyle={props.thu ? "primary" : "default"}>Thu</Button>
        <Button disabled={true} bsStyle={props.fri ? "primary" : "default"}>Fri</Button>
        <Button disabled={true} bsStyle={props.sat ? "primary" : "default"}>Sat</Button>
        <Button disabled={true} bsStyle={props.sun ? "primary" : "default"}>Sun</Button>
    </ButtonGroup>
)

export default AvailDisplay;