import {
    Box,
    Flex,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'

const Navbar = () => {
    const userViewNavTabs = ["Book Sitter", "Adopt", "Pet Store"]
    return (
        <>
                <Box fontFamily="regular" fontSize={'x-large'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                    <Flex h={16} justifyContent={'space-between'} alignItems={'center'}>
                        <HStack spacing={8} alignItems={'center'}>
                            <Box fontWeight={"semibold"} px={5}>PawPet</Box>
                            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                {userViewNavTabs.map((tab) => (
                                    <NavbarButtons tab={tab} />
                                ))}
                            </HStack>
                        </HStack>
                        <Flex alignItems={'center'}>
                            <Button
                                color="white"
                                colorScheme={'black'}
                                bg={'black'}
                                size={'sm'}
                                mr={4}>
                                Log out
                            </Button>
                            <Button
                                color="white"
                                bg={'black'}
                                colorScheme={'black'}
                                size={'sm'}
                                mr={4}>
                                Profile
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
        </>
    )
}

const NavbarButtons = (props) => {
    return (<Box
        fontSize={"large"}
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('black', 'white'),
            color: "white"
        }}>
        {props.tab}
    </Box>)
}


export default Navbar