import React from "react";
import { img_300, unavailable } from "../../Config/config";
import Badge from '@mui/material/Badge';
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
const SingleContent = ({ id, poster, title, date, mediaType, voteAverage }) => {
  return (
    <ContentModal mediaType={mediaType} id={id}>
        <Badge badgeContent = {voteAverage<= 0 ? 4 : voteAverage.toFixed(1)} color= {voteAverage > 6? "primary": "error"} />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <div className="subtitle">
      <span className="subtitle__span">
        {mediaType === "tv" ? "TV Series" : "Movie"}
      </span> 
      <span className="subtitle__span">{date}</span>
    </div>
    </ContentModal>
  );
};

export default SingleContent;
