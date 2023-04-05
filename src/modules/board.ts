import { createReducer } from 'typesafe-actions';
import { Board } from "../App";
import { createAction } from "redux-actions";
import { fetchBoardApi, fetchBoardListApi } from "../lib/api";
import { Dispatch } from 'redux';

const FETCH = "board/FETCH";
const FETCH_SUCCESS = "board/FETCH_SUCCESS";
const FETCH_FAILURE = "board/FETCH_FAILURE";

const FETCH_LIST = "board/FETCH_LIST";
const FETCH_LIST_SUCCESS = "board/FETCH_LIST_SUCCESS";
const FETCH_LIST_FAILURE = "board/FETCH_LIST_FAILURE";

export const fetchStart = createAction(FETCH);
export const fetchSuccess = createAction(FETCH_SUCCESS, (data: string) => data);
export const fetchFailure = createAction(FETCH_FAILURE, (err: any) => err);

export const fetchListStart = createAction(FETCH_LIST);
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS, (data: string) => data);
export const fetchListFailure = createAction(FETCH_LIST_FAILURE, (err: any) => err);

export const readBoardThunk = (boardNo: string) => async (dispatch: Dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetchBoardApi(boardNo);

    dispatch(fetchSuccess(response.data));
  } catch (e) {
    dispatch(fetchFailure(e));

    throw e;
  }
};

export const listBoardThunk = () => async (dispatch: Dispatch) => {
  dispatch(fetchListStart());
  try {
    const response = await fetchBoardListApi();

    dispatch(fetchListSuccess(response.data));
  } catch (e) {
    dispatch(fetchListFailure(e));
    
    throw e;
  }
};

export interface BoardState {
  loading: { FETCH: boolean, FETCH_LIST: boolean};
  board: Board;
  boards: Board[];
  error: any;
}

const initialState: BoardState = {
  loading: {
    FETCH: false,
    FETCH_LIST: false,
  },
  board: { boardNo: '', title: '', writer: '', content: '', regDate: '' },
  boards: [],
  error: null,
};

const board = createReducer(
  initialState,
  {
    [FETCH]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH: true,
      },
    }),
    [FETCH_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH: false,
      },
      board: action.payload,
    }),
    [FETCH_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH: false,
      },
      error: action.payload,
    }),
    [FETCH_LIST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH_LIST: true,
      },
    }),
    [FETCH_LIST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH_LIST: false,
      },
      boards: action.payload,
    }),
    [FETCH_LIST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        FETCH_LIST: false,
      },
      error: action.payload,
    }),
  },
);

export default board;
