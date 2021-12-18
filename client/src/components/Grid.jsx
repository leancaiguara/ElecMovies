import axios from "axios";
import { useQuery } from "../hooks/useQuery";
//react
import { useState, useEffect } from "react";

//chakra ui
import { Box, SimpleGrid, useColorModeValue, Heading } from "@chakra-ui/react";

//components
import { Card } from "./Card";
import { Carrousel } from "./Carrousel";

export const Grid = () => {
  const bg = useColorModeValue("#FAFAFA", "rgb(24,26,32)");
  const color = useColorModeValue("black", "white");

  const [movies, setMovies] = useState([]);

  const [carru, setCarru] = useState([]);

  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    const searchIn = search ? `/search/${search}` : "/discover";
    axios
      .get(`/api/movie${searchIn}`)
      .then((res) => res.data)
      .then((data) => {
        setMovies(data.results);
      })
      .catch(console.error);
  }, [search]);

  useEffect(() => {
    axios
      .get("/api/movie/discover")
      .then((res) => res.data)
      .then((data) => {
        setCarru(data.results);
      })
      .catch(console.error);
  }, []);
  return (
    <Box color={color} bg={bg}>
      <Carrousel movies={carru} />
      <Heading mt="20px" id="result" mb="25px" ml="34px" size="lg">
        {search ? "Resultados" : "Destacados"}
      </Heading>
      <SimpleGrid
        bg={useColorModeValue("#FAFAFA", "black")}
        columns={[2, 3, 5]}
        spacingX="15px"
        spacingY="5px"
      >
        {movies.map((e, i) => {
          return <Card key={i} img={e.poster_path} title={e.title} movieId={e.id} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
