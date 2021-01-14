import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { mutate } from 'swr';

import { createSite } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';

function AddSiteModal({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const auth = useAuth();

  const onCreateSite = async ({ name, url }) => {
    try {
      const newSite = {
        author: auth.user.uid,
        createdAt: new Date().toISOString(),
        name,
        url
      };

      const id = await createSite(newSite);
      toast({
        position: 'top',
        title: 'Site Created',
        description: "We've created your site for you",
        status: 'success',
        duration: 4500,
        isClosable: true
      });
      mutate(
        '/api/sites',
        async (data) => ({
          sites: [{ id, ...newSite }, ...data.sites]
        }),
        false
      );
      onClose();
    } catch (error) {
      console.error(`Error creating the Site: ${error}`);
    }
  };

  return (
    <>
      <Button
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{ transform: 'scale(0.95)', bg: 'gray.800' }}
        onClick={onOpen}
      >
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My Site"
                name="name"
                ref={register({
                  required: true
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: true
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={2}>
              Cancel
            </Button>
            <Button
              backgroundColor="teal-custom"
              color="black-custom"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSiteModal;
