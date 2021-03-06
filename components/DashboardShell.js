import React from 'react';
import NextLink from 'next/link';
import { Box, Flex, Link, Avatar } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

import { useAuth } from '@/lib/auth';
import { LogoIcon } from './Icons';

const DashboardShell = ({ children }) => {
  const auth = useAuth();
  let title;

  if (typeof window !== 'undefined') {
    const { pathname } = window.location;
    title = pathname.charAt(1).toUpperCase() + pathname.slice(2);
  }

  return (
    <>
      <NextSeo title={`Fast Feedback - ${title}`} />
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
              <NextLink href="/dashboard" passHref>
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
              <Avatar size="sm" src={auth.user?.photoUrl} />
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={[0, 8, 8]}>
          {children}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardShell;
