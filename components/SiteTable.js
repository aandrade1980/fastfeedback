import { Box, Link } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { Table, Td, Th, Tr } from './Table';

const SiteTable = ({ sites }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th>{''}</Th>
      </Tr>
    </thead>
    <tbody>
      {sites.map(({ id, name, url, createdAt }) => (
        <Box as="tr" key={id}>
          <Td fontWeight="medium">{name}</Td>
          <Td>{url}</Td>
          <Td>
            <Link>View Feedback</Link>
          </Td>
          <Td>{format(parseISO(createdAt), 'PPpp')}</Td>
        </Box>
      ))}
    </tbody>
  </Table>
);

export default SiteTable;
