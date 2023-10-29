import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import './ContentModal.css'
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "./Carousel/Carousel"
import {
  unavailable,
  img_500,
  unavailableLandscape,
} from "../../Config/config";

const style = {
  boxShadow: 24,
  p: 4,
  maxHeight: "calc(100vh - 110px)",
  overflowY: "auto",
  width: "90%",

  bgcolor: "#39445a",
  color: "#fff",

};

export default function ContentModal({ children, mediaType, id }) {

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchVideo();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);

  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );


    setVideo(data.results[0]?.key);
  };
  return (
    <>
      <div type="button" onClick={handleOpen} className="media" style={{cursor: "pointer"}} color ="inherit">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div id="transition-modal-description" sx={{}}>
              {content && (
                <div className="contentModal">
                  <img className="content_potrait "
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt = {content.name || content.title}

                  />
                  <img
                    className="contentModal_landscape"
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                  />
                  <div className="contentModal_about">
                    <span className="contentModal_title">
                      {content.name || content.title}(
                      {(
                        content.first_air ||
                        content.release_date ||
                        "------"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content.tagline &&(
                       <i className = "tagline">{content.tagline}</i>
                    )}
                    <span className="contentModal_description">{content.overview}</span>
                    <div>
                    <Carousel mediaType = {mediaType} id = {id}/>
                    </div>

                    <Button
                    variant = "contained"
                    startIcon = {<YouTubeIcon/>}
                    color= "error"
                    target="__blank"
                    href = {`https://www.youtube.com/watch?v=${video}`}
                     >
                        Watch the Trailer
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
