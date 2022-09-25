import React from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { AddIcon, SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { getContactById } from './Network';
import { useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import {ArrowLeftIcon} from "@chakra-ui/icons";

const SingleCart = () => {
    const [contact,setConatct] = useState();
    const params = useParams()
   
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchcontact = async() =>{
           let data = await getContactById(params.id);
           setConatct(data);
           console.log(contact);
        }
        fetchcontact();
    },[]);

    const bactToHome = () => {
        navigate('/')
    }
  return (
    <>
    <Box m='5'>
    <ArrowLeftIcon onClick={bactToHome} />
    </Box>
        {
            contact && <Flex
      w="90vw"
      h='30vh'
      boxShadow="xl"
      p="4"
      justifyContent="space-between"
      align="center"
      bg="purple.500"
      borderRadius="lg"
      m="4"
      fontSize='1rem'
    >
    <Flex flex='3' >
    <Box p='2'>
    <FontAwesomeIcon icon={faUser} fontSize="40px"  />

    </Box>
      <Stack color="white" ml='123px' >
        <Text as="p" fontSize="lg" textTransform='capitalize' >
        {contact.name}
        </Text>
        <Text color="whiteAlpha.700">{contact.email}</Text>
      </Stack>
    </Flex>
      
     
      
    </Flex>
        }
    </>
  )
}

export default SingleCart