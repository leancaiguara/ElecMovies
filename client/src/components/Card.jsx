//react
import { Link } from "react-router-dom";

//chakra ui
import { Box, Center, Image, Button, useColorModeValue } from "@chakra-ui/react";

export const Card = ({ img, title, movieId }) => {
  const bg = useColorModeValue("##FFFFFF", "black");
  const color = useColorModeValue("white", "gray.800");
  return (
    <Center bg={bg} py="10px" px="10px">
      <Link to={`movie/${movieId}`}>
        <Box maxW={"200px"} w={"full"} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
          <Image
            h={"280px"}
            w={"full"}
            src={`https://image.tmdb.org/t/p/w500${img}`}
            alt={title}
            objectFit={"cover"}
          />

          <Box p={1} bg="black" border="1px" borderColor="rgb(249,217,20)">
            <Button
              w={"full"}
              bg="black"
              color="white"
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {title}
            </Button>
          </Box>
        </Box>
      </Link>
    </Center>
  );
};
