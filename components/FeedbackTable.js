import { Box, Code, Switch } from '@chakra-ui/react';
import { mutate } from 'swr';

import { Table, Td, Th, Tr } from './Table';
import { updateFeedback } from '@/lib/firestore';
import { useAuth } from '@/lib/auth';
import RemoveButton from '@/components/RemoveButton';

const FeedbackTable = ({ feedback }) => {
  const { user } = useAuth();

  const toggleFeedback = (e, id) => {
    updateFeedback(id, { status: e.target.checked ? 'active' : 'pending' });
    mutate(['api/feedback', user.token]);
  };

  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map(({ id, author, text, status }) => (
          <Box as="tr" key={id}>
            <Td fontWeight="medium">{author}</Td>
            <Td>{text}</Td>
            <Td>
              <Code>{'/'}</Code>
            </Td>
            <Td>
              <Switch
                colorScheme="teal"
                defaultChecked={status === 'active'}
                onChange={(e) => toggleFeedback(e, id)}
              />
            </Td>
            <Td>
              <RemoveButton idToRemove={id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
