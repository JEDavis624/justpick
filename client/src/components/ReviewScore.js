import React from 'react';
import ReactStars from '../components/react-stars';
import { Alert } from 'react-bootstrap';
import API from '../utils/API';


class ReviewScore extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      editable: false,
      aveScore: this.props.pro.profile.aveScore,
      reviewCount: this.props.pro.profile.reviewCount
    }
  }

  componentDidMount(){
    API.getReviewAuth(this.props.pro._id).then((res) => {
      console.log(res);
      if (res.data.auth) {
        this.setState({ editable: true });
      }

      console.log(res);
    })
  }

  ratingChanged = (score) => {
    console.log(score);
    API.createReview(this.props.pro._id, score).then((res) => {
      const { aveScore, reviewCount } = res.data;
      this.setState({ aveScore, reviewCount, editable: false })
    })
  }


  render(){
    return (
      <div>
        <ReactStars
          className="stars"
          count={5}
          onChange={this.ratingChanged}
          size={24}
          color2={'#ffd700'}
          edit={this.state.editable}
          value={this.state.aveScore}
        />
        <p><em>{`Score of ${this.state.aveScore.toFixed(1)} based on ${this.state.reviewCount} reviews`}</em></p>
        { 
          this.state.editable &&
          <Alert bsStyle="success">
            <p></p>
          </Alert>
        }
      </div>
    )
  }
}

export default ReviewScore;
    
    
    
    