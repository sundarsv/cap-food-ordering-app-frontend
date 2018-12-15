import React, {Component} from 'react';
import '../home/Home.css';
import Header from '../../common/header/Header';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

class Home extends Component {

    render() {
        return (
            <div>
                <Header {...this.props}/>
                <div>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Rike -Terrance Bar and Grill
                                </Typography>
                                <Typography component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                                    ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <i className="fa fa-star" aria-hidden="true"></i><span> 4.2 (2002)</span><i className="fas fa-rupee-sign"></i><span> 1800 for two</span>
                        </CardActions>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Home;