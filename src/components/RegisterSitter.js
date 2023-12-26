import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Heading,
  Input,
  Grid, 
  GridItem
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { useState } from 'react';
import { Sitter } from '../backendApi';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete"
import { geocode, RequestType } from 'react-geocode';

const RegisterSitter = (props) => {
  const [address, setAddress] = useState({})

  const handleChange = (address) => {
    this.setState({ address });
  };

  const handlePersonalInfoSubmit = (values, actions) => {
    geocode(RequestType.ADDRESS, address.value.description, {
      key: "AIzaSyA57VNMAZFwfxDlWcpDot2kXkCMERtItow",
      language: "en",
      region: "us",
    })
      .then(({ results }) => {
        const coordinates = results[0].geometry.location
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
        Sitter.post('/addSitter', {
          address: address.value.description,
          values,
          city, 
          state,
          country,
          location: coordinates
        }).then(res=>{
          console.log(res)
        })
        
      })
      .catch((error) => {
        console.error(error);
      });
    actions.setSubmitting(false)
  }
  return (
    <>
      <Box fontFamily="regular" fontSize={'x-large'} bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
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
      <Box fontFamily="regular" boxShadow={"lg"} borderColor={"gray.100"} width={"94%"} m={10} height={"500px"} p={10} borderRadius={10}>
        <Heading size={'md'} fontFamily="regular" mb={5}>
          Get yourself started as an authorised sitter!
        </Heading>
        <Tabs variant='unstyled'>
          <TabList>
            <Tab borderRadius={10} _selected={{ color: 'white', bg: 'black' }}>Personal Info</Tab>
            <Tab borderRadius={10} _selected={{ color: 'white', bg: 'black' }}>Payment Details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Formik
                initialValues={{}}
                onSubmit={(values, actions) => {
                  handlePersonalInfoSubmit(values, actions)
                }}
              >
                {(props) => (
                  <Form>
                    <Grid
                      templateColumns='repeat(6, 1fr)'
                      gap={4}>
                        <GridItem colSpan={2}>
                        <Field name='name'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='Display name' />
                            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <GridItem colSpan={2}>
                      <Field name='email'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <Field name='password'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='mobile'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Mobile</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.mobile}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <GridItem colSpan={2}>
                      <Field name='location'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Location</FormLabel>
                            <GooglePlacesAutocomplete
                              apiKey='AIzaSyA57VNMAZFwfxDlWcpDot2kXkCMERtItow'
                              selectProps={{
                                address,
                                onChange: setAddress,
                              }}
                            />
                            <FormErrorMessage>{form.errors.location}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <Field name='chargePerVisit'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Charge per visit</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.chargePerVisit}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name='numberofPets'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Pets</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='maximum pets' />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <GridItem colSpan={2}>
                      <Field name='availability'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Which days are you available?</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='Enter days seperated by comma' />
                            <FormErrorMessage>{form.errors.availability}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <GridItem colSpan={2}>
                      <Field name='canStayOvernight'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Can you stay overnight?</FormLabel>
                            <Input variant={"filled"} {...field} placeholder='yes/no' />
                            <FormErrorMessage>{form.errors.canStayOvernight}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <GridItem colSpan={2}>
                      <Field name='startTime'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>What time can you start on those days?</FormLabel>
                            <Input type='time' variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.startTime}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                      <GridItem colSpan={2}>
                      <Field name='endTime'>
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>What time can you end on those days?</FormLabel>
                            <Input type='time' variant={"filled"} {...field} placeholder='' />
                            <FormErrorMessage>{form.errors.endTime}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      </GridItem>
                    </Grid>
                    <Flex justifyContent={"right"}>
                      <Button
                        mt={4}
                        colorScheme='teal'
                        isLoading={props.isSubmitting}
                        type='submit'
                        bgColor={"black"}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </TabPanel>
            <TabPanel>

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}

export default RegisterSitter;