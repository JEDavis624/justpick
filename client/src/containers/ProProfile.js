import React, { Component } from 'react';
import { FormGroup, Radio, Checkbox, Button, FormControl, ControlLabel, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import FieldGroup from '../components/FieldGroup';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import API from '../utils/API';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CloudProfilePic from '../components/CloudProfilePic';
import { render } from 'react-dom';


BigCalendar.momentLocalizer(moment);

class ProProfile extends Component {
    constructor(props) {
        super(props);

        const miniTime = new Date();
        miniTime.setHours(8,0,0);
        const maxiTime = new Date();
        maxiTime.setHours(20,0,0);
        const defaultDate = new Date();
        defaultDate.setHours(0, 0, 0);

        this.state = {
            junior: false,
            beginner: false,
            intermediate: false,
            advanced: false,

            driving: false,
            approach: false,
            shortGame: false,
            putting: false,

            zipCode: "",
            name: "",
            bio: "",
            photo: "",
            isPro: false,
            rate: "",

            updated: false,
            radioChecked: "",

            events: [],
            minTime: miniTime,
            maxTime: maxiTime,
            defaultDate: defaultDate
        }
    }

    componentWillMount() {
        this.setState({isPro: this.props.user.isPro});
    }

    onUpdateProfile = () => {
        const skills = ["junior", "beginner", "intermediate", "advanced"];
        let skillLevel = [];

        const areas = ["driving", "approach", "shortGame", "putting"];
        let instruction = [];
        for (const skill in skills) {
            if (this.state[skills[skill]]) { skillLevel.push(skills[skill]) }
        }
        console.log(skillLevel)

        for (const area in areas) {
            if (this.state[areas[area]]) { instruction.push(areas[area]) }
        }
        console.log(instruction);

        const updates = {
            bio: this.state.bio,
            photo: this.state.photo,
            zipCode: this.state.zipCode,
            rate: this.state.rate,
            skillLevel,
            instruction
        }
        console.log(updates);
        if (skillLevel.length === 0 || instruction.length === 0){
            this.setState({
                errorMsg: "You must select a Skill Level and Area of Instruction",
                badSubmit: true
            });
        } else {
            API.update(updates).then((res) => {
                console.log(res);
                this.props.updateUser(res.data);
                this.setState({ updated: false })
            }).catch((e) => {
                console.log(e.response.data.errors);
            })
        }

    }

    onCheckboxChange = (e) => {
        const { name, checked } = e.target;
        this.setState({ [name]: checked })
        console.log(name, checked);

        if (!this.state.updated) { this.setState({ updated: true })}
    }

    onRadioChange = (e) => {
        const { value, checked } = e.target;
        console.log(value, checked)
        if (this.state.radioChecked) {
            this.setState({ [this.state.radioChecked]: false });
        }
        this.setState({ 
            [value]: checked,
            radioChecked: value
        });

        if (!this.state.updated) { this.setState({ updated: true })}
    }

    onZipChange = (e) => {
        const { name, value } = e.target;
        if (value.match(/^\d{0,5}$/)){
            this.setState({ [name]: value });
        }
        console.log(name, value);

        if (!this.state.updated) { this.setState({ updated: true })}
    }

    onTextAreaChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(name, value);

        if (!this.state.updated) { this.setState({ updated: true })}
    }

    onRateChange = (e) => {
        const { name, value } = e.target;
        if (value.match(/^\d*$/)){
            this.setState({ [name]: value});
        }

        if (!this.state.updated) { this.setState({ updated: true })}
    }

    onPhotoUpdate = (url) => {
        this.setState({ 
            photo: url,
            updated: true
        })
    }

    componentDidMount() {
        console.log("didmount called")
        if (this.props.user && this.props.user.profile) {
            const newBio = this.props.user.profile.bio;
            this.setState({ bio: newBio });

            const newZip = this.props.user.profile.zipCode;
            console.log(newZip);
            this.setState({ zipCode: newZip });

            const skillLevel = this.props.user.profile.skillLevel;
            console.log(skillLevel);
            skillLevel.forEach(skill => this.setState({ 
                [skill]: true,
                radioChecked: skill
            }));

            const instruction = this.props.user.profile.instruction;
            instruction.forEach(area => this.setState({ [area]: true }));

            const photo = this.props.user.profile.photo;
            this.setState({ photo });

            const rate = this.props.user.profile.rate;
            this.setState({ rate });
        }
        const name = `${this.props.user.firstName} ${this.props.user.lastName}`;
        this.setState({ name });
        this.setState({ isPro: this.props.user.isPro });

        API.getAppointmentsByUserId(this.props.user.userId)
            .then(res => {
                // console.log(res.data);
                const events = this.transformApptToEvent(res.data);
                // console.log('Did the transform work?');
                // console.log(events);
                this.setState({
                    events: events
                });
            })
            .catch(err => console.log(err));
        
        //this.setState({ zipCode: newZip })
    }

    transformApptToEvent = (appts) => {
      const events = appts.map(appt => {
          const event = {
              id: appt._id,
              title: 'Sports Lesson',
              start: new Date(appt.startTime),
              end: new Date(appt.startTime + 3600000)
          };
          return event;
      });
      return events;  
    };

    buttonStyle = {
        margin: '20px 0'
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={4} className="nameImage">
                        
                         {this.state.photo === '' ? <CloudProfilePic onPhotoUpdate={this.onPhotoUpdate} /> : <Image src={this.state.photo} thumbnail />}
                       
                        <h3 
                        className="profileName"
                        >{this.state.name}</h3>

                    </Col>

                    <Col xs={6} md={8}>
                        <FormGroup>
                            <ControlLabel>Bio</ControlLabel>
                            <FormControl 
                                componentClass="textarea"
                                rows="8"
                                name="bio"
                                value={this.state.bio}
                                placeholder="Tell us about yourself."
                                onChange={this.onTextAreaChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={4}>
                        {
                            this.props.user.isPro && this.props.user.profile === null &&
                            <Alert bsStyle="warning">
                                <h4>Attention</h4>
                                <p>You must create a profile to setup your availability, and you must setup your availability to show up in search results</p>
                            </Alert>
                        }
                    </Col>

                    <Col xs={6} md={4}>
                        <FormGroup>
                            <ControlLabel>Zip Code</ControlLabel>
                            <FormControl
                                name="zipCode"
                                value={this.state.zipCode}
                                placeholder="Enter Zip Code"
                                onChange={this.onZipChange}
                            />
                            {/* <input 
                                placeholder="Enter Zip Code"
                                value={this.state.zipCode}
                                name="zipCode"
                                onChange={this.onTextChange}    
                            ></input> */}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6} md={4}>
                    </Col>

                    <Col xs={6} md={4}>
                        { this.state.isPro ?
                        ( <div><h4>Skill Levels Taught:</h4>
                        <FormGroup>
                            <Checkbox 
                                name="junior"
                                checked={this.state.junior}
                                onChange={this.onCheckboxChange}
                            >Junior</Checkbox>
                            <Checkbox
                                name="beginner"
                                checked={this.state.beginner}
                                onChange={this.onCheckboxChange}
                            >Beginner</Checkbox>
                            <Checkbox
                                name="intermediate"
                                checked={this.state.intermediate}
                                onChange={this.onCheckboxChange}
                            >Intermediate</Checkbox>
                            <Checkbox
                                name="advanced"
                                checked={this.state.advanced}
                                onChange={this.onCheckboxChange}
                            >Advanced</Checkbox>
                        </FormGroup>
                        <ControlLabel>Hourly Rate</ControlLabel>
                        <FormControl
                                name="rate"
                                value={this.state.rate}
                                placeholder="Enter Hourly Rate"
                                onChange={this.onRateChange}
                            />
                        <Link to="/avail"><Button style={this.buttonStyle} bsStyle="success" disabled={this.props.user.profile === null ? true : false}>Set Availability</Button></Link>
                        </div>)

                        : ( <div><h4>Skill Level:</h4>
                        <FormGroup>
                            <Radio
                                name="skillLevel"
                                value="junior"
                                checked={this.state.radioChecked === 'junior'}
                                onChange={this.onRadioChange}
                            >Junior</Radio>
                            <Radio
                                name="skillLevel"
                                value="beginner"
                                checked={this.state.radioChecked === 'beginner'}
                                onChange={this.onRadioChange}
                            >Beginner</Radio>
                            <Radio
                                name="skillLevel"
                                value="intermediate"
                                checked={this.state.radioChecked === 'intermediate'}
                                onChange={this.onRadioChange}
                            >Intermediate</Radio>
                            <Radio
                                name="skillLevel"
                                value="advanced"
                                checked={this.state.radioChecked === 'advanced'}
                                onChange={this.onRadioChange}
                            >Advanced</Radio>
                        </FormGroup></div> )}
                    </Col>

                    <Col xs={6} md={4}>
                        {this.state.isPro ? <h4>Provide Instruction In:</h4> : <h4>Seeking Instruction For:</h4>}
                        <FormGroup>
                            <Checkbox
                                name="football"
                                checked={this.state.driving}
                                onChange={this.onCheckboxChange}
                            >Football</Checkbox>
                            <Checkbox
                                name="soccer"
                                checked={this.state.approach}
                                onChange={this.onCheckboxChange}
                            >Soccer</Checkbox>
                            <Checkbox
                                name="basketball"
                                checked={this.state.shortGame}
                                onChange={this.onCheckboxChange}
                            >Basketball</Checkbox>
                            <Checkbox
                                name="baseball"
                                checked={this.state.putting}
                                onChange={this.onCheckboxChange}
                            >Baseball</Checkbox>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    {
                        this.state.badSubmit &&
                        <Alert bsStyle="danger">
                            <p>{this.state.errorMsg}</p>
                        </Alert>
                    }
                    <Button 
                        bsStyle="primary" 
                        id="updateProfile" 
                        disabled={!this.state.updated}
                        onClick={this.onUpdateProfile}    
                    >Update Profile</Button>
                </Row>
                <Row style={{ height: 800 }} >
                    <BigCalendar 
                        events={this.state.events}
                        defaultDate={this.state.defaultDate}
                        defaultView={this.state.isPro ? 'week' : 'agenda'}
                        step={30}
                        min={this.state.minTime}
                        max={this.state.maxTime}
                        formats={{
                            dayFormat: 'ddd M/D',
                            weekdayFormat: 'dddd'
                        }}
                    />
                </Row>
            </Grid>
        );
    }
}

export default ProProfile;