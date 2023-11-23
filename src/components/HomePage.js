import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCat, faPerson } from '@fortawesome/free-solid-svg-icons'

const HomePage = () => {
  return (
    <>
      <Box fontFamily="regular"  fontSize={'x-large'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} justifyContent={'space-between'} alignItems={'center'}>
          <Box fontWeight={"semibold"} px={5}>PawPet</Box>
          <Flex alignItems={'center'}>
          <Button
              color="white"
              colorScheme={'black'}
              bg={'black'}
              size={'sm'}
              mr={4}>
              Log in
            </Button>
            <Button
              color="white"
              bg={'black'}
              colorScheme={'black'}
              size={'sm'}
              mr={4}>
              Sign up
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box fontFamily="regular" >
        <Flex alignItems={'center'}>
        <Box m={10} width={"50%"} height={"500px"} p={10}  >
          <Flex direction={'column'} alignItems={'flex-start'}>
            <Heading fontSize={"5xl"} mt={"200px"}>Go anywhere, we got your pets covered.</Heading>
            <HStack pt={10}>
              <Button _hover={{bg: "black"}} color={'white'}  bg={'black'} w={"fit-content"} p={5}>
                Book a sitter
              </Button>
              <Button _hover={{bg: "black"}} color={'white'} bg={'gray'} w="fit-content" p={5}>
                Register as a sitter
              </Button>
            </HStack>
          </Flex>
        </Box>
        <Box pt={"250px"} h={'500px'} width={"50%"}>
          <Flex alignItems={"center"} justifyContent={'center'}>
          <FontAwesomeIcon icon={faCat}  size="10x" bounce/>
          </Flex>
        </Box>
        </Flex>
      </Box>
    </>
  )
}

const NavbarButtons = (props) => {

}

export default HomePage;  