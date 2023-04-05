import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardList from "../components/BoardList";
import {
  listBoardThunk,
} from "../modules/board";
import { BoardState } from "../modules/board";

const BoardListContainer = () => {
  const dispatch = useDispatch();

  const { boards, isLoading } = useSelector((state: BoardState) => ({
    boards: state.boards,
    isLoading: state.loading.FETCH_LIST,
  }));

  useEffect(() => {
    dispatch(listBoardThunk());
  }, [dispatch]);

  return <BoardList boards={boards} isLoading={isLoading} />;
};

export default BoardListContainer;
