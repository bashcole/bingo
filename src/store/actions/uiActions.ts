import {AppDispatch, RootState} from "@/store";
import {fetchLocalStorage, randomRange, updateLocalStorage} from "@/lib/utils";
import {publicRequest} from "@/lib/axios";
import {ICell} from "@/interfaces/ICell";
import {UIActions} from "@/store/reducers/uiSlice";

export const setCell = (index: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        dispatch(UIActions.incrementMarkedCellsCount())

        dispatch(updateCellState(index))

        if (getState().ui.marked_cells_count == 24) {
            const stateConfig = fetchLocalStorage("state", null);
            if (typeof stateConfig?.board_id === "string") {
                const response = await publicRequest.get(`/board/over/${stateConfig?.board_id}`);
                const n = response.data
                dispatch(UIActions.setType('finished'))
                dispatch(UIActions.setScore(n.score))
            }
        }
    }
}


export const callNextNumber = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const stateConfig = fetchLocalStorage("state", null);
        if (typeof stateConfig?.board_id === "string") {
            const response = await publicRequest.get(`/board/next/${stateConfig.board_id}`);
            const num = response.data
            if (num.toString().length > 0) {
                dispatch(UIActions.incrementCallNextNumberCount())
                dispatch(UIActions.setNextNumber(num))
            } else {
                dispatch(UIActions.setType('lost'))
                await publicRequest.put(`/board/${stateConfig.board_id}`, {
                    type: 'lost'
                });
            }

        }

    }
}

export const fetchBoardState = (id: string, shared: boolean, callback: any = null) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const response = await publicRequest.get(`/board/${id}`);
        const data = response.data;
        const cells = JSON.parse(data.cells)
        dispatch(UIActions.populateCells(cells))
        dispatch(UIActions.setType(data.type))
        dispatch(UIActions.setScore(data.score))

        if (!shared) {
            const count = cells.filter((item: ICell) => item[1]).length;
            updateLocalStorage('state', 'type', data.type)
            dispatch(UIActions.setMarkedCellsCount(count))
        }

        if (callback) {
            callback()
        }
    }
};

export const generateNewCard = (callback: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const a = fetchLocalStorage('state', null);
        const c = randomRange(25, 1, 100)
        const response = await publicRequest.post('/board', {
            cells: JSON.stringify(c),
            user_id: a.user_id
        });
        const boardID = response.data.id

        updateLocalStorage('state', 'board_id', boardID)
        dispatch(UIActions.setLiveMode())
        dispatch(UIActions.setNextNumber(null))
        dispatch(UIActions.setCallNextNumberCount(0))
        dispatch(UIActions.setType('new'))
        dispatch(UIActions.setMarkedCellsCount(0))
        dispatch(UIActions.populateCells(c))

        callback(boardID)

    }
}

export const updateCellState = (index: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(UIActions.setMarkedCell({
            index,
            state: true
        }))
        const {cells} = getState().ui;
        const stateConfig = fetchLocalStorage("state", null);
        if (typeof stateConfig?.board_id === "string") {
            const response = await publicRequest.put(`/board/${stateConfig.board_id}`, {
                cells: JSON.stringify(cells)
            });
        }

    }
}
