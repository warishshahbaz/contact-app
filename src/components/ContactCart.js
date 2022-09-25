import React from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ContactCart = ({ x,removed,EditData }) => {
  const{name,email} = x;
  return (
    <Flex
      w="90vw"
      boxShadow="xl"
      pr="1"
      justifyContent="space-between"
      align="center"
      bg="purple.500"
      borderRadius="lg"
      m="4"
    >
    <Flex flex='3' >
    <Box p='2'>
    <FontAwesomeIcon icon={faUser} fontSize="40px"  />

    </Box>
      <Stack color="white" ml='123px' >
        <Text as="p" fontSize="lg" textTransform='capitalize' >
          {name}
        </Text>
        <Text color="whiteAlpha.700">{email}</Text>
      </Stack>
    </Flex>
      
      <Flex flex='1' justifyContent='space-around' >
      <EditIcon fontSize="2xl" color="white" onClick={()=>EditData(x.id,x.name,x.email)} />
      <DeleteIcon fontSize="2xl" color="red" onClick={()=> removed(x.id)} />
      </Flex>
      
    </Flex>
  );
};

export default ContactCart;
