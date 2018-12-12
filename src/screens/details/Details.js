import React, {Component} from 'react';
import '../details/Details.css';
import Header from '../../common/header/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faInr } from '@fortawesome/free-solid-svg-icons'

library.add(faStar)



class Details extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="restaurant-info">
                    <div className="restaurant-image">
                        <img height="200px" width="auto" src="https://b.zmtcdn.com/data/pictures/0/18564740/686000d2b5cfebfad3300f313eaae79c.jpg?output-format=webp" />
                    </div>
                    <div className="restaurant-details">
                        <p className="restaurant-title">Loud Silence</p>
                        <p className="restaurant-locality">CBD-BELAPUR</p>
                        <p className="restaurant-categories">Chinese, Continental, Indian, Italian, Snacks</p>
                        <div className="rating-cost">
                            <div className="restaurant-rating">
                                <FontAwesomeIcon icon="star" /> 4.4
                                <p>Average rating by 658 users</p>
                            </div>
                            <div className="restaurant-avg-cost">
                                <FontAwesomeIcon icon="star" /> 600
                                <p>Average cost for two people</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-items">
                    <div className="menu-item">

                    </div>
                </div>
                <div className="cart">

                </div>
            </div>
        )
    }
}

export default Details;