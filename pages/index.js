import Head from 'next/head';
import { Button, Flex } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import LogoIcon from '@/components/LogoIcon';

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
          <Button mt={4} size="sm" onClick={() => auth.signinWithGitHub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </div>
  );
}
