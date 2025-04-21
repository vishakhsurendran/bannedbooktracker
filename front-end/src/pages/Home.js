import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import handmaids from "../pictures/handmaids.jpg"
import true_diary from "../pictures/true_diary.jpg"
import perks from "../pictures/perks.jpg"
import thirteen_reasons from "../pictures/13_reasons.jpg"
import beloved from "../pictures/beloved.jpg"
import hate_u_give from "../pictures/hate_u_give.jpg"
import poet_x from "../pictures/poet_x.jpg"
import slaughterhouse from "../pictures/slaughterhouse.jpg"
import this_book from "../pictures/this_book.jpg"
import {Link} from "react-router";

function Home() {

    //basic carousel structure from https://www.npmjs.com/package/react-multi-carousel
    const responsive = {
        superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
        },
        desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
        },
    };

    return(
        <div>
            <div className="login-form-spacer"></div>
            <Carousel responsive={responsive}>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("The Absolutely True Diary of a Part-Time Indian")}`}>
                        <img src={true_diary} alt="The Absolutely True Diary of a Part-Time Indian book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("The Perks of Being a Wallflower")}`}>
                        <img src={perks} alt="The Perks of Being a Wallflower book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("The Handmaid's Tale")}`}>
                        <img src={handmaids} alt="The Handmaid's Tale book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("Beloved")}`}>
                        <img src={beloved} alt="Beloved book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("The Hate U Give")}`}>
                        <img src={hate_u_give} alt="The Hate U Give book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("The Poet X")}`}>
                        <img src={poet_x} alt="The Poet X book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("Slaughterhouse-Five")}`}>
                        <img src={slaughterhouse} alt="Slaughterhouse Five book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("This Book Is Gay")}`}>
                        <img src={this_book} alt="This Book Is Gay book cover" className="logo"/>
                    </Link>
                </div>
                <div>
                    <Link to={`/search?query=${encodeURIComponent("Thirteen Reasons Why")}`}>
                        <img src={thirteen_reasons} alt="13 Reasons Why book cover" className="logo"/>
                    </Link>
                </div>
            </Carousel>
        </div>
    )

}

export default Home;