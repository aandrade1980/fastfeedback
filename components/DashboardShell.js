import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Link,
  Avatar,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import AddSiteModal from './AddSiteModal';
import LogoIcon from './LogoIcon';

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Box backgroundColor="gray.100" h="100vh">
      <Flex
        backgroundColor="white"
        mb={[8, 16]}
        w="full"
        borderTop="5px solid #0AF5F4"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          pt={4}
          pb={4}
          maxW="1250px"
          margin="0 auto"
          w="full"
          px={8}
          h="60px"
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Link>
                <LogoIcon h={6} w={6} />
              </Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link mr={4} ml={4}>
                Sites
              </Link>
            </NextLink>
            <NextLink href="/feedback" passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Link
              mr={5}
              fontSize="sm"
              color="gray.600"
              onClick={() => auth.signout()}
            >
              Log Out
            </Link>
            <NextLink href="/account" passHref>
              <Link>
                <Avatar size="sm" src={auth.user?.photoUrl} />
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
      <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>My Sites</Heading>
          <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
