import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react'

const Kmodel = ({isOpen,onClose,onOpen,children,title}) => {
    
    return (
      <>
        
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
                {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             {children}
            </ModalBody>
  
        
          </ModalContent>
        </Modal>
      </>
    )
}

export default Kmodel;

