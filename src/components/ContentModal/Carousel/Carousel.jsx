import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../../Config/config";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();
const Carousel = ({ mediaType, id }) => {
  const [credit, setCredit] = useState();
  const items = credit?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carousel_img"
      />
      <b className="carousel_text">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0:{
      items :3,
    },
    512:{
      items :5,
    },
    1024:{
      items :7,
    },
  }
   useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
     fetchCredits();
   })

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setCredit(data.cast);
  };
  return <AliceCarousel autoPlay responsive={responsive} infinite disableDotsControls disableButtonsControls mouseTracking items={items} />;
};

export default Carousel;
