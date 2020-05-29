import React from 'react';
import { Row, Col, Button, FormGroup, ControlLabel, FormControl, Well } from 'react-bootstrap';
import FieldGroup from './FieldGroup';

const rowStyle = {
    marginBottom: '20px', 
    padding: '20px'
};

const SearchForm = props => {
    return (
        <Row style={rowStyle}>
            <Row>
                <Col md={4} mdOffset={2}>
                <Well>
                    <FormGroup>
                        <ControlLabel>Skill Level</ControlLabel>
                        <FormControl 
                            name="skillLevel"
                            componentClass="select" 
                            onChange={props.handleInputChange}>
                            <option value="any">Any</option>
                            <option value="junior">Junior</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </FormControl>
                    </FormGroup>
                </Well>
                </Col>
                <Col md={4}>
                <Well>
                    <FieldGroup
                        name="zipCode"
                        value={props.zipCode}
                        type="text"
                        label="Zip Code"
                        placeholder="Enter a ZIP code"
                        onChange={props.handleInputChange}
                    />
                </Well>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Button bsStyle="primary" onClick={props.handleSearch} block>Search</Button>
                </Col>
            </Row>
            </Row>
    )
}

export default SearchForm;