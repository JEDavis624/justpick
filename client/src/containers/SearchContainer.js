import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import ProSearchResult from '../components/ProSearchResult';
import MainJumbotron from '../components/Jumbotron';
import API from '../utils/API';

class SearchContainer extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            results: [],
            skillLevel: 'any',
            zipCode: '',
            instruction: []
        };
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(`${name} is ${value}`);
        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.handleSearch();
    };

    handleSearch = event => {
        //filter on client side?
        API.getAllPros()
        .then(res => {
            this.setState({ results: res.data });
        })
        .catch(err => console.log(err));
    };

    

    render() {
        return (
            <div>
                <MainJumbotron />
                <Grid>
                <Row>
                    <SearchForm 
                        skillLevel={this.state.skillLevel}
                        zipCode={this.state.zipCode}
                        instruction={this.state.instruction}
                        handleInputChange={this.handleInputChange}
                        handleSearch={this.handleSearch}
                    />

                </Row>

                    {this.state.results.map(pro => 
                        <ProSearchResult 
                            key={pro._id}
                            pro={pro}
                            selectPro={this.props.selectPro}
                        />
                    )}
                </Grid>
            </div>
        );
    }
}

export default SearchContainer;