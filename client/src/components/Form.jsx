import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useColorMode,
  CloseButton,
} from "@chakra-ui/react";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";

////////////////////////////
export const Form = ({ modo }) => {
  const bg = useColorModeValue("rgb(255,255,255)", "black");
  const color = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    sucess: false,
    rejected: false,
  });

  const [nose, setNose] = useState(false);
  console.log("esto qcy", values);

  const navigate = useNavigate();
  console.log("valores", values);

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password.length < 5 || values.password.length > 20)
      setAlert({ sucess: false, rejected: true });
    else {
      const ruta = modo === "register" ? "signup" : "signin";
      console.log("esto es el login", values);
      axios.post(`/api/auth/${ruta}`, values).then((resp) => {
        resp && setNose(true);
        setAlert({ sucess: true, rejected: false });
        navigate("/");
      });
      !nose && setAlert({ sucess: false, rejected: true });
    }
  };

  return (
    <Flex h="full" align={"center"} display="flex" justify={"center"} flexDirection={"column"} bg={bg}>
      <Box bg={bg} w="full" h="10vh" display="flex" justifyContent="space-between">
        <Link to="/">
          {" "}
          <Heading mt="20px" ml="20px">
            ElecMovies
          </Heading>
        </Link>
        <Button mr="20px" mt="20px" onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Box>
      <Stack spacing={8} mx={"auto"} bg={bg} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          {modo === "register" ? (
            <Heading fontSize={"4xl"}>Registrarse</Heading>
          ) : (
            <Heading fontSize={"4xl"}>Iniciar sesión</Heading>
          )}
          <Text fontSize={"lg"} color={color}>
            Las mejores Películas & Series a tu alcance
          </Text>
        </Stack>
        {alert.rejected && (
          <Alert status="error">
            <AlertIcon />

            <AlertTitle mr={2}>Datos invalidos</AlertTitle>
            <AlertDescription>Ingresa los datos correctos. </AlertDescription>
            <CloseButton
              onClick={() => {
                setAlert({ sucess: false, rejected: false });
              }}
              position="absolute"
              right={(["8px"], ["-8px"])}
              top={(["8px"], ["-8px"])}
            />
          </Alert>
        )}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("rgb(255,255,255)", " rgb(24,26,32)")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Nombre de usuario</FormLabel>
                <Input
                  _hover={{
                    borderColor: "rgb(249,217,20)",
                  }}
                  _focus={{
                    borderColor: "rgb(249,217,20)",
                  }}
                  type="text"
                  onChange={handleChange}
                  type="text"
                  name="username"
                  placeholder="Tu nombre"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input
                  _hover={{
                    borderColor: "rgb(249,217,20)",
                  }}
                  _focus={{
                    borderColor: "rgb(249,217,20)",
                  }}
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>
              <Stack bg={bg} spacing={10}>
                <Button
                  color="black"
                  bg="rgb(249,217,20)"
                  _hover={{
                    opacity: "0.8",
                  }}
                  type="submit"
                >
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
