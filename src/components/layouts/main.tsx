import React from 'react';
import {Outlet} from "react-router-dom";
import {Box, Container, Flex} from "@chakra-ui/react";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Main = () => (
    <>
        <Box as="header" pb={8}>
            <NavBar />
        </Box>
        <Box as="main" pb={8} flexGrow="1">
            <Container maxW="container.md" pt={14}>
                <Flex flexDirection="column">
                    <Outlet />
                </Flex>
            </Container>
        </Box>
        <Footer />
    </>
);

export default Main;