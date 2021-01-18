import React from 'react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';

import { formatDate } from '@/util/helpers';
import { GitHubIcon, GoogleIcon } from './Icons';

const Feedback = ({ author, text, createdAt, provider }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {author} {provider === 'google.com' ? <GoogleIcon /> : <GitHubIcon />}
    </Heading>
    <Text color="gray.500" mb={4} fontSize="xs">
      {formatDate(createdAt, 'PPpp')}
    </Text>
    <Text color="gray.800">{text}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
);

export default Feedback;
