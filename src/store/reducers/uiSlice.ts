import {createSlice} from '@reduxjs/toolkit';

import {fetchLocalStorage, generateDefaultState, randomRange, updateLocalStorage} from "@/lib/utils";
import {publicRequest} from "@/lib/axios";
import {AppDispatch, RootState} from "@/store";
import {ICell} from "@/interfaces/ICell";

const defaultState = generateDefaultState()

const UiSlice = createSlice({
    name: "ui",
    initialState: {
        score: 0,
        type: "new",
        next_number: null,
        call_next_number_count: 0,
        marked_cells_count: 0,
        cells: defaultState,
        mode: "live"
    },
    reducers: {
        populateCells(state, data) {
            state.cells = data.payload
        },
        setNextNumber(state, data) {
            state.next_number = data.payload
        },
        setType(state, data) {
            state.type = data.payload
        },
        setScore(state, data) {
            state.score = data.payload
        },
        incrementCallNextNumberCount(state) {
            state.call_next_number_count++
        },
        setCallNextNumberCount(state, data) {
            state.call_next_number_count = data.payload
        },
        setMarkedCell(state, data) {
            state.cells[data.payload.index][1] = data.payload.state
        },
        incrementMarkedCellsCount(state) {
            state.marked_cells_count++
        },
        setMarkedCellsCount(state, data) {
            state.marked_cells_count = data.payload
        },
        setLiveMode(state) {
            state.mode = "live"
        },
        setViewMode(state) {
            state.mode = "view"
        },
    }
})

export const UIActions = UiSlice.actions;
export default UiSlice.reducer