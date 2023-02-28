import {useEffect, useState} from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import Section from "@/components/Section";
import {publicRequest} from "@/lib/axios";
import Loader from "@/components/Loader";
import {ILeaderboard} from "@/interfaces/ILeaderboard";
const Leaderboard = () => {

    const [rows, setRows] = useState<ILeaderboard[]|null>(null);

    useEffect(() => {
        const loader = async () => {
            const response = await publicRequest.get('/leaderboard');
            setRows(response.data);
        }
        loader()
    }, [])

    return (
        <Section delay={0.1}>
            {!rows && <Loader/>}

            {rows && <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Name</Th>
                            <Th>Score</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rows &&
                            rows.map((row, index: number) => (
                                <Tr>
                                    <Td>{++index}</Td>
                                    <Td>{row.name}</Td>
                                    <Td>{row.score}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>}

        </Section>
    );
};

export default Leaderboard;
