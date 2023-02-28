import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {  useParams } from 'react-router-dom';

import Section from "@/components/Section";
import Board from "@/components/Board";
import {fetchBoardState} from '@/store/actions/uiActions'

const Shared = () => {

    let { board_id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchBoardState(board_id, true))
    }, [])

    return (
        <Section delay={0.1}>
            <Board canEdit={false}/>
        </Section>
    );
};

export default Shared;
