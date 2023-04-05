import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardRead from "../components/BoardRead";
import {
  readBoardThunk,
} from "../modules/board";
import { RouteComponentProps } from 'react-router-dom';
import { BoardState } from "../modules/board";
import { withRouter } from "react-router-dom";
import { removeBoardApi } from "../lib/api";

interface MatchParams {
  boardNo: string;
}

const BoardReadContainer = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const { boardNo } = match.params;

  const dispatch = useDispatch();

  const { board, isLoading } = useSelector((state: BoardState) => ({
    board: state.board,
    isLoading: state.loading.FETCH,
  }));

  const onRemove = async () => {
    try {
      await removeBoardApi(boardNo);

      alert("삭제되었습니다.");

      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(readBoardThunk(boardNo));
  }, [dispatch, boardNo]);

  return (
    <BoardRead
      boardNo={boardNo}
      board={board}
      isLoading={isLoading}
      onRemove={onRemove}
    />
  );
};

export default withRouter(BoardReadContainer);
