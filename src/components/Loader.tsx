import React from 'react';
import {Flex, Spinner} from '@chakra-ui/react'

const Loader = () => (
    <Flex h={40} justifyContent="center" alignItems="center">
        <Spinner/>
    </Flex>
);

export default Loader;