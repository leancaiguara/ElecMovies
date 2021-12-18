import { order } from "../utils/order";

//react
import { useState, useEffect } from "react";
// react slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//chakra ui
import { Box, Heading } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

//components
import { Card } from "./Card";

export const Carrousel = ({ movies }) => {
  const bg = useColorModeValue("rgb(255,255,255)", "rgb(24,26,32)");
  const color = useColorModeValue("black", "white");

  const settings = {
    infinite: true,
    slidesToShow: 5,

    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box bg={bg} mt={["10vh", "15px"]} ml="25px" w="95vw">
      <Box bg={bg} display={["none", "block"]}>
        <Heading ml="15px" mb="20px" size="lg">
          Estrenos
        </Heading>
        <Slider {...settings}>
          {movies.map((e, i) => (
            <Box key={i} bg={bg}>
              <Card img={e.poster_path} title={e.title} movieId={e.id} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};
