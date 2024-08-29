import { useEffect, useState, useRef } from "react";
import image2 from "../assets/images/gallery/2.jpeg";
import image3 from "../assets/images/gallery/3.jpeg";
import image5 from "../assets/images/gallery/5.jpeg";
import image7 from "../assets/images/gallery/7.jpeg";
import image8 from "../assets/images/gallery/8.jpeg";
import image9 from "../assets/images/gallery/9.jpeg";
import image11 from "../assets/images/gallery/11.jpeg";
import { FaCircle } from "react-icons/fa6";
import { BsDisplay } from "react-icons/bs";

const images = [image2, image3, image5, image7, image8, image9, image11];

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? images.length - 1 : index - 1;
    setIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = index === images.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  const containerStyles = {
    width: "1080px",
    height: "607px",
    margin: "0 auto",
  };

  const sliderStyles = {
    height: "100%",
    positive: "relative",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundSize: "cover",
    backgroundImage: `url(${images[index]})`,
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "-30px",
  };

  const dotStyles = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px,",
  };

  return (
    <div style={containerStyles}>
      <div style={sliderStyles}>
        <div style={leftArrowStyles} onClick={goToPrevious}>
          &gt;
        </div>
        <div style={rightArrowStyles} onClick={goToNext}>
          &lt;
        </div>
        <div style={slideStyles}></div>
        <div style={dotsContainerStyles}>
          {images.map((_, slideIndex) => (
            <div
              onClick={() => goToSlide(slideIndex)}
              style={dotStyles}
              className="dot"
              key={slideIndex}
            >
              <FaCircle className="fa-circle" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
