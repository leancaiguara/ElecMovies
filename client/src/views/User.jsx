import axios from "axios";
//react
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router";
//chakra ui
import {
  Box,
  useColorModeValue,
  Heading,
  Button,
  useColorMode,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, ButtonGroup, Textarea } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

//components
import { Navbar } from "../components/Navbar";

export const User = () => {
  const bg = useColorModeValue("rgb(255,255,255)", "#000000");
  const color = useColorModeValue("black", "white");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState("");
  let [value, setValue] = useState("");
  const [render, setRender] = useState(null);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  useEffect(async () => {
    const resUser = await axios.get("/api/auth/me");
    resUser.data ? setUser(resUser.data) : setUser(null);
    const favorites = await axios.get(`/api/favorite/${resUser.data.id}`);
    setMovies(favorites.data);
  }, [render]);

  const handleSelectRemove = async (id) => {
    await axios.delete("/api/favorite/remove", { data: { userId: user.id, movieId: id } });
    render == true ? setRender(false) : setRender(true);
  };

  const handleSelect = async () => {
    await axios.put("/api/favorite/edit", { comment: value, userId: user.id, movieId: edit.movieId });
    setValue("");
    render == true ? setRender(false) : setRender(true);
    onClose();
  };

  return user ? (
    <Box>
      <Navbar />
      <Box
        bg={bg}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pt="70px"
      >
        <Heading>Mis favoritos</Heading>
        <Text>Tus peliculas y series favoritas</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Titulo</Th>
              <Th>Valoración</Th>
              <Th> Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {movies.map((e, i) => {
              return (
                <Tr key={i}>
                  <Td>
                    <Link to={`/movie/${e.movieId}`}>
                      <Image maxW="7vw" src={`https://image.tmdb.org/t/p/w200${e.img}`} />
                    </Link>
                  </Td>

                  <Td>{e.title}</Td>
                  <Td>{e.value}</Td>
                  <Td>
                    <ButtonGroup variant="solid" size="sm" spacing="2px">
                      <IconButton
                        onClick={() => {
                          setEdit(e);
                          onOpen();
                        }}
                        colorScheme="green"
                        mr="10px"
                        icon={<AiFillEdit />}
                      />
                      <IconButton
                        onClick={() => {
                          handleSelectRemove(e.movieId);
                        }}
                        borderColor="red"
                        color="rgb(255, 0, 0)"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comentario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="8px">{edit.comment || "Te gusto la película?"}</Text>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder="Añade un comentario o nota personal sobre la película"
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button
              color="black"
              bg="rgb(249,217,20)"
              _hover={{
                opacity: "0.8",
              }}
              mr={3}
              onClick={() => {
                onClose();
                setValue("");
              }}
            >
              Cerrar
            </Button>
            <Button onClick={handleSelect} variant="ghost">
              Guardar cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
    <Box display="flex" justifyContent="center" h="100vh" alignItems="center" bg={bg}>
      <h1>404</h1>
    </Box>
  );
};
//<Navigate to="/" replace={true} />
