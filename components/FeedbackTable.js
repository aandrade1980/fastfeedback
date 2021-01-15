import { Box, Code, Switch } from '@chakra-ui/react';

import { Table, Td, Th, Tr } from './Table';
import RemoveButton from '@/components/RemoveButton';

const FeedbackTable = ({ feedback }) => (
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
            <Switch colorScheme="teal" defaultChecked={status === 'active'} />
          </Td>
          <Td>
            <RemoveButton idToRemove={id} />
          </Td>
        </Box>
      ))}
    </tbody>
  </Table>
);

export default FeedbackTable;
