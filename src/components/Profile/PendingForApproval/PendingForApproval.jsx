import SideBar from '../SideBar';
import { Flex, Box, Text } from '@chakra-ui/react';
import PendingForApprovalList from './PendingForApprovalList';

const PendingForApproval = () => {
  return (
    <Flex minHeight="100vh" w="100vw" flexDirection={{ base: 'column', md: 'row' }}>
      <Box
        display="flex"
        bg="teal.400"
        minHeight={{ base: '70px', md: '100vh' }}
        w={{ base: '100%', md: '330px' }}>
        <SideBar />{' '}
      </Box>
      <Box w="100%">
        <Flex
          minHeight="10vh"
          justifyContent="space-between"
          p={{ base: '8px 0', sm: '0 20px' }}
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          borderBottom="1px solid #43b3ac">
          <Text fontSize={{ base: '22px', sm: '28px' }}>Pending For Approval</Text>
        </Flex>
        <Flex>
          <PendingForApprovalList />
        </Flex>
      </Box>
    </Flex>
  );
};

export default PendingForApproval;
