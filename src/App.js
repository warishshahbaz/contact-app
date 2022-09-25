import React, { useEffect, useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ContactCart from "./components/ContactCart";
import Kmodel from "./components/Kmodel";
import ContactForm from "./components/ContactForm";
import {addContactOnServer,getAllContacts,updateContactOnServer,deleteContact} from './components/Network'
import {NavLink} from 'react-router-dom'



  // getData from localstorage
  // const getDataFromLocal = () =>{
  //   let item = localStorage.getItem("contact");
  //   if(item){
  //     return JSON.parse(localStorage.getItem("contact"))
  //   }else{
  //     return [];
  //   }
  // }
const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputData,setInputData] = useState({
    name:"",
    email:""
  });
  const [contactData,setContactData] = useState([]);
  const [editeId,setEditId] = useState(null);
  const [editToggle,setEditToggle] = useState(false);
  const [searchData,setSearchData] = useState('');

  useEffect(()=>{
    const fetchData = async ()=>{
      let data = await getAllContacts();
      let tempArr = [];
      Object.entries(data).forEach(([key,value])=>{
        tempArr.push({id:key,name:value.name,email:value.email})
      })
      setContactData(tempArr)
    }
    fetchData();
  },[])
  //console.log(contactData);

  // inputData
  const inputHandler = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    setInputData((preVal)=>{
      return {
        ...preVal,
      [name]:value
      }
    });
  }
 
 
  // Delete
  const removed = async(id) =>{
   let data = await deleteContact(id);
   //let res = contactData.filter((x,index)=> index !== id);
   if(data == null){
    setContactData((res=>[
      ...contactData.filter((x)=> x.id !== id)
    ]));
   }
  }

  // Editing 
  const EditData = async (id,name,email) =>{
    onOpen();
   let data = await updateContactOnServer(id,name,email);
    console.log(data);
    let res = contactData.find((x)=> {
      console.log(x.id);
      return x.i === id
    });
    setInputData(data);
    setEditId(id);
    setEditToggle(true);
    console.log(contactData);
    // setContactData((preval)=>[
    //   ...contactData.filter((x)=>x.id !== id),
    //   {name:data.name,email:data.email,id}
    // ])
    await addContactOnServer(inputData.name,inputData.email)
  }

  
    // Searching...
    const searchElement  = contactData && contactData.filter((x)=> {
      return x.name.charAt(0).toLowerCase().includes(searchData.toLowerCase());
    });
    
    
   // Submit form
   const submitHandler = async () =>{
    if(inputData.name === '' || inputData.email === '' ){
      alert('plaese fill inputs')
    }else if(inputData && editToggle){
      setContactData(
        contactData.map((ele)=>{
          if(ele.id == editeId){
            return inputData
          }
          return ele;
        })
      )
      
      setEditToggle(false);
      onClose()
    }else{
      if(contactData.findIndex((x)=>  x.email == inputData.email || x.name == inputData.name) == -1){
        let data = await addContactOnServer(inputData.name,inputData.email)
       
         setContactData([...contactData,{name:inputData.name,email:inputData.email,id:data.name}]);
        //console.log(contactData);
      }else{
        alert("Sorry,Matche from your previous data")
      }
     
      onClose()
      setInputData({
        name:"",
        email:""
      });
    }
   
  }

  return (
    <>
      <Kmodel isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
        {
          <ContactForm inputData={inputData} setInputData={setInputData} inputHandler={inputHandler} submitHandler={submitHandler} />
        }
       
      </Kmodel>
      <Box w="90vw" h='100vh'  flexDirection='column' alignItems='center' justifyContent='center' >
        <Flex p="4" justify="center" align="center">
          <Image src="/banner.png" w="150px" h="100px" />
          <Heading as="h1">CONTACT APP</Heading>
        </Flex>
        <Flex justify="center" align="center" p="4">
          <Button
            width="full"
            bg="purple.700"
            fontWeight="bold"
            colorScheme="purple"
            onClick={onOpen}
          >
            <AddIcon mr="3" /> New Contact Add
          </Button>
        </Flex>

        <Box p="4"  >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
              focusBorderColor="purple"
            />
            <Input type="tel" onChange={(e)=>setSearchData(e.target.value)} placeholder="Search Contact..." />
          </InputGroup>
        </Box>
        <Box mb="4"  >
        {
          contactData && searchElement.map((x,i)=>{
            return <NavLink to={`/contact/${x.id}`}>
            <ContactCart key={i} x={x} id={i} removed={removed} EditData={EditData} />
            </NavLink>
          })
        }
         
         
        </Box>
      </Box>
    </>
  );
};

export default App;
