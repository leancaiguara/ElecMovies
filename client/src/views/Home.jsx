//components
import { Navbar } from "../components/Navbar";
import { Grid } from "../components/Grid";
import { Present } from "../components/Present";
import { Box, useColorModeValue } from "@chakra-ui/react";
export const Home = () => {
  const bg = useColorModeValue("rgb(255,255,255)", "rgb(24,26,32)");
  return (
    <Box bg={bg}>
      <Navbar />
      <Present />
      <Grid />
    </Box>
  );
};
