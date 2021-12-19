import { Box, useColorModeValue, Heading } from "@chakra-ui/react";

export const Present = () => {
  const bg = useColorModeValue("#FAFAFA", "black");
  return (
    <Box
      p={["2vh", "20vh"]}
      pt={["10vh", "none"]}
      display="flex"
      w="full"
      h={["20vh", "30vh", "30vh"]}
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      bg={bg}
    >
      <Heading size="xl">Bienvenido a ElecMovies</Heading>
      <Heading size="lg">Las mejores peliculas y series en un solo lugar</Heading>
    </Box>
  );
};
