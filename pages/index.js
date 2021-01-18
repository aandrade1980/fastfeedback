import Head from 'next/head';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { GitHubIcon, GoogleIcon, LogoIcon } from '@/components/Icons';
import { getAllFeedback } from '@/lib/firestore-admin';
import FeedbackLink from '@/components/FeedbackLink';
import Feedback from '@/components/Feedback';

const SITE_ID = 'K03D5hn0VLexQsYLjJGK';

export async function getStaticProps() {
  const { feedback: initialFeedback = [] } = await getAllFeedback(SITE_ID);

  return {
    props: {
      initialFeedback
    }, // will be passed to the page component as props
    revalidate: 60
  };
}

export default function Home({ initialFeedback }) {
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
      </Head>

      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        bg="gray.100"
        py={16}
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
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink siteId={SITE_ID} />
        {initialFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </div>
  );
}
