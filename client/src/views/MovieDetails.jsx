import { order } from "../utils/order";
import axios from "axios";
//react
import { useEffect, useState } from "react";

//react router
import { useParams } from "react-router";

//chakra ui

import { Box, Heading, Text, useColorModeValue, Image, Button, Badge } from "@chakra-ui/react";

//components
import { Navbar } from "../components/Navbar";

export const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/movie/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/auth/me")
      .then((res) => res.data)
      .then((user) => {
        console.log("esto es el usuario dentro del useeffect", user);
        setUser(user);
      });
  }, []);

  const addFavorite = () => {
    axios
      .post("/api/favorite/add", {
        movieId: id,
        userId: user.id,
        title: movie.title,
        value: movie.vote_average,
        img: movie.poster_path,
      })
      .then((agregar) => {
        console.log("esto esta pasando", agregar);
      });
  };

  const bg = useColorModeValue("#FAFAFA", "#000000");
  return (
    <Box h="100vh" bg={bg}>
      <Navbar />
      <Box
        pt="60px"
        display="flex"
        flexDirection={["column", "row"]}
        justifyContent="center"
        alignItems="center"
        bg={bg}
      >
        <Image w={["80%", "300px"]} mt="25px" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} />
        <Box bg={bg} w={["80vw", "60vw"]} ml={["0px", "25px"]}>
          <Heading mb="25px">{movie.title}</Heading>
          <Heading size="sm">Descripción</Heading>
          <Text>{movie.overview}</Text>
          <Box mt="12px">
            <Box>
              <Badge mt="5px" fontSize="sm" mr="10px">
                Valoracion:{movie.vote_average}
              </Badge>
              <Badge mt="5px" fontSize="sm">
                Año de lanzamiento:{movie.release_date}{" "}
              </Badge>
            </Box>
            <Button
              onClick={addFavorite}
              mt="25px"
              mb="25px"
              color="black"
              bg="rgb(249,217,20)"
              _hover={{
                opacity: "0.8",
              }}
            >
              Agregar a favoritos
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
