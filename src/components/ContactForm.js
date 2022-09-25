import React from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
  } from "@chakra-ui/react";

const ContactForm = ({inputData,setInputData,inputHandler,submitHandler}) => {
  return (
    <Stack>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={inputData.name}  onChange={inputHandler} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" value={inputData.email}  onChange={inputHandler} />
          </FormControl>
          <Button alignSelf='flex-end' bg='purple.700'color='white' colorScheme='purple' onClick={submitHandler} >Add Contact</Button>
          </Stack>
  )
}

export default ContactForm