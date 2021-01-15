import Head from 'next/head';
import { Button, Flex, HStack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { GitHubIcon, GoogleIcon, LogoIcon } from '@/components/Icons';

export default function Home() {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
          }}
        />
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
          <Button
            as="a"
            size="sm"
            fontWeight="medium"
            href="/dashboard"
            mt={4}
            backgroundColor="white"
            color="black"
            _hover={{ bg: 'gray.200' }}
            _active={{ transform: 'scale(0.95)', bg: 'gray.100' }}
          >
            View Dashboard
          </Button>
        ) : (
          <HStack mt={4} spacing="15px">
            <Button
              size="sm"
              onClick={() => auth.signinWithGitHub()}
              leftIcon={<GitHubIcon />}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{ transform: 'scale(0.95)', bg: 'gray.800' }}
            >
              Sign In with GitHub
            </Button>
            <Button
              size="sm"
              onClick={() => auth.signinWithGoogle()}
              leftIcon={<GoogleIcon />}
              backgroundColor="white"
              color="black"
              fontWeight="medium"
              _hover={{ bg: 'gray.200' }}
              _active={{ transform: 'scale(0.95)', bg: 'gray.100' }}
            >
              Sign In with Google
            </Button>
          </HStack>
        )}
      </Flex>
    </div>
  );
}
