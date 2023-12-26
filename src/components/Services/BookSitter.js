import { useDisclosure, Card, Stack, Avatar, CardHeader, CardBody, 
    CardFooter, Menu, MenuList, MenuItem, Box, Input, Flex, useColorModeValue, Text, 
    VStack, InputGroup, InputLeftElement, HStack, Select, Button ,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faLocationDot, faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";
import { APIProvider, Marker, Map, Pin, InfoWindow } from '@vis.gl/react-google-maps'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { geocode, RequestType } from 'react-geocode';
import { useState } from "react";
import { User } from "../../backendApi";


const BookSitter = (props) => {
    const position = { lat: 53.54, lng: 10 }
    const [sitter, setSitter] = useState(null);
    const [activeMarker, setActiveMarker] = useState(null);
    const [showInfoWindow, setInfoWindowFlag] = useState(true);
    const [address, setAddress] = useState("")
    const [query, setQueryData] = useState({})
    const [location, setLocation] = useState({
        city: "",
        state: "",
        country: "",
        lat: null,
        lng: null
    })

    const { isOpen, onClose, onOpen } = useDisclosure();
    const [filteredSitters, setFilteredSitters] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setQueryData(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        User.post("/getNearbySitters", {
            location,
            query
        }).then(res => {
            console.log(res)
            if (res.data.success) {
                const tempSitters = res.data.sitters
                setFilteredSitters(tempSitters)
                console.log(tempSitters)
                // setPosition({
                //     lat: parseFloat(tempSitters[0].personalDetails.location.lat),
                //     lng: parseFloat(tempSitters[0].personalDetails.location.lat)
                // })
            } else {
                alert("No sitters found in your area")
            }
        })
    }

    const handleSelect = async address => {
        geocode(RequestType.ADDRESS, address, {
            key: "AIzaSyA57VNMAZFwfxDlWcpDot2kXkCMERtItow",
            language: "en",
            region: "us",
        })
            .then(({ results }) => {
                const { city, state, country } = results[0].address_components.reduce(
                    (acc, component) => {
                        if (component.types.includes("locality"))
                            acc.city = component.long_name;
                        else if (component.types.includes("administrative_area_level_1"))
                            acc.state = component.long_name;
                        else if (component.types.includes("country"))
                            acc.country = component.long_name;
                        return acc;
                    },
                    {}
                );
                const lat = results[0].geometry.location.lat;
                const lng = results[0].geometry.location.lng;
                setLocation({
                    city,
                    state,
                    country,
                    lat,
                    lng
                })
            })
        setAddress(address)
    };

    return (
        <>
            <Box position={"absolute"} zIndex={-1} borderRadius={"lg"} border="2px" boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" >
                <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                    <Box w="1362px" h="611px">
                        <Map zoom={12} center={
                            filteredSitters.length !== 0 ? {
                                lat: parseFloat(filteredSitters[0].personalDetails.location.lat),
                                lng: parseFloat(filteredSitters[0].personalDetails.location.lng),
                            } : position
                        } mapId={process.env.REACT_APP_MAP_ID}>
                            {filteredSitters.length !== 0 && filteredSitters.map(sitter => (
                                <>
                                    <Marker
                                        // onClick={(props, marker) => {
                                        //     console.log("clicked")
                                        //     setSelectedElement(sitter);
                                        //     setActiveMarker(marker);
                                        // }}
                                        position={{
                                            lat: parseFloat(sitter.personalDetails.location.lat),
                                            lng: parseFloat(sitter.personalDetails.location.lng),
                                        }} />
                                </>
                            ))}
                            {/* <InfoWindow
                                visible={showInfoWindow}
                                marker={activeMarker}
                                onCloseClick={() => {
                                    setSelectedElement(null);
                                }}
                            >
                                <Avatar name={selectedElement !== null && selectedElement.personalDetails.name} />
                            </InfoWindow> */}
                        </Map>
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
                                    <Box width={"20%"} position={"absolute"} zIndex={10} bg={"gray.100"} border={2} borderRadius={2} boxShadow={5}>
                                        {suggestions.map(suggestion => {
                                            return (
                                                <Box onFocus={() => console.log(suggestion)} _hover={{ cursor: "pointer" }} {...getSuggestionItemProps(suggestion)} boxShadow={2} p={2}>
                                                    {suggestion.description}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faMoneyBill} />
                            </InputLeftElement>
                            <Input name="maxCharge" size={"lg"} placeholder='Maximum Charge' />
                        </InputGroup>
                        <InputGroup variant={"filled"}>
                            <InputLeftElement pointerEvents='none'>
                                <FontAwesomeIcon size="lg" icon={faCalendarDays} />
                            </InputLeftElement>
                            <Input name="date" color={"gray.500"} size={"lg"} type="date" placeholder='Date' />
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
                            <Input name="time" color={"gray.500"} size={"lg"} type="time" placeholder='Time' />

                        </InputGroup>
                        <Button onClick={handleSearch} width={"100%"} _hover={{ bg: 'black', color: "gray.100" }} color={"gray.200"} bg={"black"}>Search</Button>

                    </VStack>
                </Box>
                <Box overflow={"scroll"} bg={"white"} borderRadius={"lg"} border="2px"
                    sx={
                        {
                            '::-webkit-scrollbar': {
                                display: 'none'
                            }
                        }
                    }
                    boxShadow={"lg"} borderColor={"gray.100"} fontFamily="regular" m={10}
                    width={"30%"} height={"530"} p={5}>
                    <VStack spacing={'5'} alignItems={"flex-start"}>
                        <Text fontSize={"larger"} fontWeight={"semibold"}>Sitters near you: </Text>
                        {filteredSitters.length !== 0 ? filteredSitters.map(sitter => (
                            <Card width={"full"}>
                                <CardBody>
                                    <Stack direction="row">
                                        <Avatar name={sitter.personalDetails.name} />
                                        <Box>
                                            <Text fontSize={"small"} fontWeight={"medium"}>{sitter.personalDetails.name}</Text>
                                            <Text noOfLines={1} fontSize={"small"} fontWeight={"medium"}>{sitter.personalDetails.address}</Text>
                                            <Text fontSize={"small"} fontWeight={"medium"}>Ratings: 4</Text>

                                        </Box>

                                    </Stack>
                                    <Flex justifyContent={"right"}>
                                        <Button mr={1} p={1} bgColor={"blue.300"} border={"none"} size={"small"}>rate</Button>
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            setSitter(sitter)
                                            onOpen()
                                        }} mr={1} p={1} bgColor={"green.300"} border={"none"}
                                            size={"small"}>book</Button>
                                    </Flex>

                                </CardBody>
                            </Card>
                        )) :
                            <Text fontSize={"medium"} color={"grey"} fontWeight={"semibold"}>search for sitters using the search box...</Text>
                        }
                    </VStack>
                </Box>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay 
                     bg='none'
                     backdropFilter='auto'
                     backdropInvert='80%'
                     backdropBlur='2px'/>
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </>
    )
}

export default BookSitter;