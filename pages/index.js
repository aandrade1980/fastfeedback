import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import LogoIcon from '@/components/LogoIcon';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Flex
        as="main"
        direction="column"
        align="center"
        h="100vh"
        justify="center"
      >
        <LogoIcon />

        {auth.user ? (
          <EmptyState />
        ) : (
          // <Button onClick={() => auth.signout()}>Sign Out</Button>
          <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </div>
  );
}
