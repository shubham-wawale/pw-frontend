import { Menu, MenuList, MenuItem, Box, Input, Flex, useColorModeValue, Text, VStack, InputGroup, InputLeftElement, HStack, Select, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faLocationDot, faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { APIProvider, AdvancedMarker, Map, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useState } from "react";


const BookSitter = (props) => {
    const position = { lat: 53.54, lng: 10 }
    const [address, setAddress] = useState("")
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    })

    const handleChange = (address) => {
        this.setState({ address });
    };

    const handleSelect = async address => {
        geocodeByAddress(address)
            .then(results => {
                console.log(results)
                getLatLng(results[0])
            })
            .then(latLng => {
                setCoordinates(latLng)
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
        setAddress(address)
    };

    return (
        <>
            <Box position={"absolute"} zIndex={-1} borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" >
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <Box w="1362px" h="620px">
                        <Map zoom={9} center={position} mapId={process.env.REACT_APP_MAP_ID}></Map>
                    </Box>
                </APIProvider>
            </Box>
            <Flex justifyContent={"space-between"}>
                <Box bg={"white"} borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" m={10} width={"23%"} height={"410px"} p={5}>
                    <VStack spacing={'5'} alignItems={"flex-start"}>
                        <Text fontSize={"larger"} fontWeight={"semibold"}>Get a sitter</Text>
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                            highlightFirstSuggestion={true}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <InputGroup variant={"filled"}>
                                        <InputLeftElement pointerEvents='none'>
                                            <FontAwesomeIcon size="lg" icon={faLocationDot} />
                                        </InputLeftElement>
                                        <Input size={"lg"} placeholder='Location' {...getInputProps({
                                            placeholder: 'Search Places ...',
                                            className: 'location-search-input',
                                        })} />
                                    </InputGroup>
                                    {loading && <div>Loading...</div>}
                                    <Box width={"20%"} position={"absolute"} zIndex={10} bg={"gray.100"}  border={2} borderRadius={2} boxShadow={5}>
                                        {suggestions.map(suggestion => {
                                            return (
                                                <Box onFocus={()=> console.log(suggestion)} _hover={{cursor:"pointer"}} {...getSuggestionItemProps(suggestion)} boxShadow={2} p={2}>
                                                    {suggestion.description}
                                                </Box>
                                            );
                                        })}
                                    </Box> 
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <InputGroup  variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faMoneyBill} />
                            </InputLeftElement>
                            <Input size={"lg"} placeholder='Maximum Charge' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faCalendarDays} />
                            </InputLeftElement>
                            <Input color={"gray.500"} size={"lg"} type="date" placeholder='Date' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faClock} />
                            </InputLeftElement>
                            {/* <Select textAlign={"left"} size={"lg"} color={"gray.500"} variant={"filled"} placeholder="Time" >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select> */}
                            <Input color={"gray.500"} size={"lg"} type="time" placeholder='Time' />

                        </InputGroup>
                        <Button width={"100%"} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.200"} bg={"black"}>Search</Button>

                    </VStack>
                </Box>
                <Box bg={"white"} borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" m={10} width={"23%"} height={"410px"} p={5}>
                    <VStack spacing={'5'} alignItems={"flex-start"}>
                        <Text fontSize={"larger"} fontWeight={"semibold"}>Get a sitter</Text>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faLocationDot} />
                            </InputLeftElement>
                            <Input size={"lg"} placeholder='Location' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faMoneyBill} />
                            </InputLeftElement>
                            <Input size={"lg"} placeholder='Maximum Charge' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faCalendarDays} />
                            </InputLeftElement>
                            <Input color={"gray.500"} size={"lg"} type="date" placeholder='Date' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faClock} />
                            </InputLeftElement>
                            {/* <Select textAlign={"left"} size={"lg"} color={"gray.500"} variant={"filled"} placeholder="Time" >
                            <option value='option1'>Option 1</option>
                            <option value='option2'>Option 2</option>
                            <option value='option3'>Option 3</option>
                        </Select> */}
                            <Input color={"gray.500"} size={"lg"} type="time" placeholder='Time' />

                        </InputGroup>
                        <Button width={"100%"} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.200"} bg={"black"}>Search</Button>

                    </VStack>
                </Box>
            </Flex>
        </>
    )
}

export default BookSitter;