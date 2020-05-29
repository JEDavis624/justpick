import React from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const divStyle = {
  width: '12%',
  textAlign: 'center'
}

const DailyAvailability = (props) => (
      <div style={divStyle}>
      <h4>{props.day}</h4>
      <hr />
      <ToggleButtonGroup vertical block
        type="checkbox"
        value={props.hours}
        onChange={(e) => 
          { 
            props.updateSelected({day: props.daySm, hours: e})
          }}
      >
        <ToggleButton block bsStyle={props.hours.includes(8) ? "primary" : "default"} value={8}>8:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(9) ? "primary" : "default"} value={9}>9:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(10) ? "primary" : "default"} value={10}>10:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(11) ? "primary" : "default"} value={11}>11:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(12) ? "primary" : "default"} value={12}>12:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(13) ? "primary" : "default"} value={13}>1:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(14) ? "primary" : "default"} value={14}>2:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(15) ? "primary" : "default"} value={15}>3:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(16) ? "primary" : "default"} value={16}>4:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(17) ? "primary" : "default"} value={17}>5:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(18) ? "primary" : "default"} value={18}>6:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(19) ? "primary" : "default"} value={19}>7:00</ToggleButton>
        <ToggleButton block bsStyle={props.hours.includes(20) ? "primary" : "default"} value={20}>8:00</ToggleButton>
      </ToggleButtonGroup>
      </div>
)

export default DailyAvailability;