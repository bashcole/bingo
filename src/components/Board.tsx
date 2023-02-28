import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { useClipboard } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {Grid, Container, Box, Heading, HStack, VStack, Square, useColorModeValue, Flex, Button} from "@chakra-ui/react";

import {RootState} from "@/store";
import Section from "@/components/Section";
import Cell from "@/components/Cell";
import {fetchLocalStorage} from "@/lib/utils";
import {generateNewCard,callNextNumber} from '@/store/actions/uiActions'

const Board = ({canEdit = true}: { canEdit: boolean }) => {

    const { onCopy, value: clipboardValue, setValue, hasCopied } = useClipboard("");
    const score = useSelector((state: RootState) => state.ui.score)
    const cells = useSelector((state: RootState) => state.ui.cells)
    const nextNumber = useSelector((state: RootState) => state.ui.next_number)
    const gameType = useSelector((state: RootState) => state.ui.type)
    const dispatch = useDispatch()

    const setCopy = (boardID: string) => {
        setValue(`${import.meta.env.VITE_FRONTEND}/shared/${boardID}`)
    }

    const handleNewCard = () => {
        // @ts-ignore
        dispatch(generateNewCard(setCopy))
    }

    const handleNewNumber = () => {
        const stateConfig = fetchLocalStorage("state", null);
        if (stateConfig.board_id !== undefined) {
            // @ts-ignore
            dispatch(callNextNumber())
        }
    }

    const handleShareCard = () => {
        onCopy()
    }

    useEffect(() => {
        const stateConfig = fetchLocalStorage("state", null);
        if (stateConfig?.board_id !== undefined) {
            setValue(`${import.meta.env.VITE_FRONTEND}/shared/${stateConfig.board_id}`)
        }
    }, [])

    return (
        <Section delay={0.1}>
            <Flex flexDirection="column" alignItems="center">

                {gameType === 'lost' && <Heading>Game Over: You Lost!</Heading>}
                {gameType === 'finished' && <Heading>Game Over: {score} points</Heading>}

                <HStack spacing={{base: "0px", md: "24px"}} mt={4} display={{base: "block", md: "flex"}}>

                    {canEdit && <HStack spacing='24px' mb={4} display={{base: "flex", md: "none"}}>

                        <VStack>
                            <Button _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                    color={useColorModeValue("#D3BBAF", "#fff")}
                                    bg={useColorModeValue("#A5271C", "#2B2D2F")} alignSelf="flex-start"
                                    onClick={handleNewCard}>New Card</Button>
                            <Button
                                _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                color={useColorModeValue("#D3BBAF", "#fff")}
                                bg={useColorModeValue("#A5271C", "#2B2D2F")}
                                alignSelf="flex-start" onClick={handleShareCard}>Share Card</Button>
                        </VStack>

                        {gameType !== 'finished' && gameType !== 'lost' && <>
                        <Button alignSelf="flex-start" _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                color={useColorModeValue("#D3BBAF", "#fff")}
                                bg={useColorModeValue("#A5271C", "#2B2D2F")} onClick={handleNewNumber}>Call Next
                            Number</Button>

                        <Square alignSelf="flex-start" size='40px' borderRadius={8} bg={useColorModeValue("#A5271C", "#2B2D2F")}>
                            <motion.div
                                style={{display: 'inline-block'}}
                                key={nextNumber}
                                initial={{y: -20, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: 20, opacity: 0}}
                                transition={{duration: 0.2}}
                            >{nextNumber}
                            </motion.div>
                        </Square>
                        </>}
                    </HStack>}

                    <Container w={32} alignSelf="flex-start">
                    {canEdit && <>
                        <VStack>
                            <Button data-test="new-board" display={{base: "none", md: "inline-block"}}
                                    _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                    color={useColorModeValue("#D3BBAF", "#fff")}
                                    bg={useColorModeValue("#A5271C", "#2B2D2F")}
                                    alignSelf="flex-start" onClick={handleNewCard}>New Card</Button>
                            <Button display={{base: "none", md: "inline-block"}}
                                    _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                    color={useColorModeValue("#D3BBAF", "#fff")}
                                    bg={useColorModeValue("#A5271C", "#2B2D2F")}
                                    alignSelf="flex-start" onClick={handleShareCard}>{hasCopied ? "Copied!" : "Share Card"}</Button>
                        </VStack>
                    </>}
                    </Container>

                    <Box p={2} borderRadius="md" bg={useColorModeValue("#A5271C", "#2B2D2F")} w="max-content">
                        <Heading as="h3" textAlign="center" fontSize={80} mb={4}
                                 color={useColorModeValue("#D3BBAF", "#fff")}>
                            Bingo
                        </Heading>
                        <Grid templateColumns="repeat(5, 1fr)" gap={2}>

                            {cells && cells.map((cell: any | null, i: number) => (
                                <Cell key={i} index={i} value={cell[0]} marked={cell[1]} canMark={canEdit}/>
                            ))}
                        </Grid>
                    </Box>
                    <Container w={32} alignSelf="flex-start">
                    {canEdit && gameType !== "finished" && gameType !== "lost" && <VStack spacing='24px' alignSelf="flex-start" display={{base: "none", md: "flex"}}>
                        <Button data-test="new-number-button" _hover={{bg: useColorModeValue("#b75249", "#404243")}}
                                color={useColorModeValue("#D3BBAF", "#fff")}
                                bg={useColorModeValue("#A5271C", "#2B2D2F")} onClick={handleNewNumber}>Call Next
                            Number</Button>
                        <Box fontSize={20}>
                            <Square size='80px' borderRadius={8} bg={useColorModeValue("#A5271C", "#2B2D2F")}>
                                <motion.div
                                    data-test="new-number"
                                    style={{display: 'inline-block'}}
                                    key={nextNumber}
                                    initial={{y: -20, opacity: 0}}
                                    animate={{y: 0, opacity: 1}}
                                    exit={{y: 20, opacity: 0}}
                                    transition={{duration: 0.2}}
                                >
                                    {nextNumber}
                                </motion.div>
                            </Square>
                        </Box>
                    </VStack>}
                    </Container>
                </HStack>
            </Flex>
        </Section>
    );
}

export default Board;