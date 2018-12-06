import React, {Component} from 'react';
import '../home/Home.css';
import Header from '../../common/header/Header';

class Home extends Component {

    render() {
        return (
            <div>
                <Header />
                <div>
                    Home page
                </div>
            </div>
        )
    }
}

export default Home;