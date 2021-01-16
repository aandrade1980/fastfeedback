import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { createFeedback } from '@/lib/firestore';
import { getAllFeedback, getAllSites } from '@/lib/firestore-admin';
import { useAuth } from '@/lib/auth';
import Feedback from '@/components/Feedback';

export async function getStaticProps(context) {
  const { siteId } = context.params;
  const { feedback: initialFeedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback
    }, // will be passed to the page component as props
    revalidate: 60
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map(({ id }) => ({
    params: {
      siteId: id.toString()
    }
  }));
  return {
    paths,
    fallback: true
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const router = useRouter();
  const { siteId } = router.query;
  const { user } = useAuth();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, uid, provider } = user;

    const newFeedback = {
      author: name,
      authorId: uid,
      siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider,
      status: 'pending'
    };

    try {
      const id = await createFeedback(newFeedback);

      setAllFeedback([{ id, ...newFeedback }, ...allFeedback]);
      setIsLoading(false);
      inputEl.current.value = '';
    } catch (error) {
      console.error(`Error creating feedback: ${error}`);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl id="comment" my={6}>
          <FormLabel>Comment</FormLabel>
          <Input type="text" ref={inputEl} />
          <Button
            mt={2}
            type="submit"
            isLoading={isLoading}
            loadingText="Submiting"
            backgroundColor="gray.200"
            _hover={{ bg: 'gray.400' }}
            _active={{ transform: 'scale(0.95)' }}
            disabled={router.isFallback}
          >
            Add Comment
          </Button>
        </FormControl>
        {allFeedback &&
          allFeedback.map((_feedback) => (
            <Feedback key={_feedback.id} {..._feedback} />
          ))}
      </Box>
    </Box>
  );
};

export default SiteFeedback;
