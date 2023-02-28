import {useEffect, useState} from "react";
import {useDispatch} from 'react-redux'

import Loader from "@/components/Loader";
import {fetchBoardState} from '@/store/actions/uiActions'
import {UIActions} from "@/store/reducers/uiSlice"
import Section from "@/components/Section";
import {fetchLocalStorage, generateDefaultState} from "@/lib/utils";
import Board from "@/components/Board";


const Home = () => {

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {

        const stateConfig = fetchLocalStorage("state", null);
        if (typeof stateConfig?.board_id === "string") {
            // @ts-ignore
            dispatch(fetchBoardState(stateConfig.board_id, false, () => setIsLoading(false)))
        } else {

            dispatch(UIActions.populateCells(generateDefaultState()))
            setIsLoading(false)

        }
    }, []);

    if (isLoading) return <Loader/>;

    return (
        <Section delay={0.1}>
            <Board canEdit={true}/>
        </Section>
    );
};

export default Home;
