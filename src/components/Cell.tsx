import {motion} from 'framer-motion'
import {GridItem, useColorModeValue} from "@chakra-ui/react";
import {StarIcon} from '@chakra-ui/icons'
import {setCell} from '@/store/actions/uiActions'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";

const FREE_COLUMN_NAME = import.meta.env.VITE_FREE_COLUMN_NAME

interface IProps {
    index: number,
    value: number | null | string,
    marked: boolean,
    canMark: boolean
}

const Cell = ({value, marked = false, canMark = false, index}: IProps) => {

    const _key = useColorModeValue(`light_${value}`, `dark${value}`);
    const showIcon = marked;
    const nextNumber = useSelector((state: RootState) => state.ui.next_number)
    const gameMode = useSelector((state: RootState) => state.ui.mode)

    const dispatch = useDispatch()

    const handleClick = () => {
        if (!canMark) return;
        if (gameMode === "view") return
        if (value !== FREE_COLUMN_NAME && value !== null && value === nextNumber) {

            // @ts-ignore
            dispatch(setCell(index))
        }
    }

    return (<GridItem cursor="pointer" onClick={handleClick} h="20" w="20" color={useColorModeValue("#A5271C", "#fff")}
                      bg={useColorModeValue("#D3BBAF", "#212124")} display='flex'
                      alignItems="center"
                      justifyContent="center">

        <motion.div
            data-test={`cell-${value}`}
            style={{position: 'absolute'}}
            key={value}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
        >{value}</motion.div>

        {showIcon &&
            <motion.div
                style={{position: 'absolute'}}
                key={_key}
                initial={{opacity: 0}}
                animate={{opacity: 0.3}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
            >
                <StarIcon fontSize={42}/>
            </motion.div>}
    </GridItem>)
};

export default Cell;
