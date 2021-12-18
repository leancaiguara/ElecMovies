import axios from "axios";
//react
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//chakra ui
import { Box, Flex, Button, Text, useColorModeValue, Heading, Input, useColorMode } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState("");
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const buscar = () => {
    if (!search) setSearch(true);
    else setSearch(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${title}`);
  };

  useEffect(() => {
    axios.get("/api/auth/me").then((user) => {
      setUser(user.data);
    });
  }, []);

  const handleLogout = () => {
    axios.get("/api/auth/logout").then(() => {
      setUser(null);
      navigate("/");
    });
  };
  //styles
  const bg = useColorModeValue("rgb(255,255,255)", "rgb(24,26,32)");
  const color = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box position="fixed" w="full" zIndex="10">
      <Flex
        w="full"
        display={["none", "flex"]}
        bg={bg}
        color={color}
        minH="60px"
        maxH="60px"
        borderStyle={"solid"}
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Link to="/">
          <Heading color={useColorModeValue("black", "white")}>ElecMovies</Heading>
        </Link>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Buscar películas"
            w="40vw"
            size="sm"
            borderColor="rgb(183,189,198)"
            _hover={{
              borderColor: "rgb(249,217,20)",
            }}
            _focus={{
              borderColor: "rgb(249,217,20)",
            }}
          />
        </form>

        <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
        {!user ? (
          <Box display="flex" alignItems="center" w="18vw" justifyContent="space-between">
            <Link to="/login">
              <Text
                _hover={{
                  color: "rgb(249,217,20)",
                }}
              >
                Iniciar sesión
              </Text>
            </Link>

            <Link to="/register">
              <Button
                color="black"
                bg="rgb(249,217,20)"
                _hover={{
                  opacity: "0.8",
                }}
              >
                Registrarse
              </Button>
            </Link>
          </Box>
        ) : (
          <Box display="flex" alignItems="center" w="18vw" justifyContent="space-between">
            <Text
              onClick={handleLogout}
              _hover={{
                color: "rgb(249,217,20)",
              }}
            >
              Cerrar Sesión
            </Text>

            <Link to="/user">
              <Button
                color="black"
                bg="rgb(249,217,20)"
                _hover={{
                  opacity: "0.8",
                }}
              >
                Mi perfil
              </Button>
            </Link>
          </Box>
        )}
      </Flex>
      <Flex
        display={["flex", "none"]}
        bg={useColorModeValue("rgb(255,255,255)", "rgb(24,26,32)")}
        color={useColorModeValue("black", "white")}
        minH="60px"
        maxH="65px"
        border="1px"
        borderColor={useColorModeValue("gray.200", "black")}
        flexDirection="row"
        justifyContent="space-around"
        alignContent="center"
        flexWrap="wrap"
      >
        <Menu>
          <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
          {!user ? (
            <MenuList bg={bg}>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
              <Link to="/register">
                <MenuItem>Registrarse</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>Iniciar sesión</MenuItem>
              </Link>
            </MenuList>
          ) : (
            <MenuList bg={bg}>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>
              <Link to="/user">
                <MenuItem>Mi Perfil</MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </MenuList>
          )}
        </Menu>
        <Link to="/">
          <Heading mt="5px" size="lg">
            ElecMovies
          </Heading>
        </Link>
        <Search2Icon onClick={buscar} mt="10px" />
      </Flex>
      {search ? (
        <Box
          bg={bg}
          color={color}
          justifyContent="center"
          borderBottom="1px"
          minH="50px"
          maxH="55px"
          borderColor="rgb(249,217,20)"
          display="flex"
          alignItems="center"
        >
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Buscar peliculas"
            size="md"
            width="80%"
            value={title}
          />
          <Search2Icon onClick={handleSubmit} ml="10px" />
        </Box>
      ) : null}
    </Box>
  );
};
