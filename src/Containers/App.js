import React, { Component } from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import './app.css';


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users=> this.setState({ robots: users}));
}

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        // destructure to avoid having to use this.state on calls
        const { robots, searchfield } = this.state;

        // iterate through robots to transform and filter
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
            // terenary operater
            return !robots.length ? // if length of robots array is 0 (no data was returned) display Loading h1
                <h1>Loading</h1> :
                // else length of robots array > 0 return below
                (
                    <div className='tc'>
                        <h1 className='f1'>RoboFriends</h1>
                        <SearchBox searchChange={this.onSearchChange}/>
                        <Scroll>
                            <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                            </ErrorBoundry>
                        </Scroll>
                    </div>
                );
            }
}

export default App