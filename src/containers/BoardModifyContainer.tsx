import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import BoardModifyForm from "../components/BoardModifyForm";
import { modifyBoardApi } from "../lib/api";
import {
  readBoardThunk,
} from "../modules/board";

import { RouteComponentProps } from 'react-router-dom';
import { BoardState } from "../modules/board";

interface MatchParams {
  boardNo: string;
}

const BoardModifyContainer = ({ match, history }: RouteComponentProps<MatchParams>) => {
  const { boardNo } = match.params;

  const dispatch = useDispatch();

  const { board, isLoading } = useSelector((state: BoardState) => ({
    board: state.board,
    isLoading: state.loading.FETCH,
  }));

  const onModify = async (boardNo: string, title: string, content: string) => {
    try {
      await modifyBoardApi(boardNo, title, content);

      alert("수정되었습니다.");

      history.push("/read/" + boardNo);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(readBoardThunk(boardNo));
  }, [dispatch, boardNo]);

  return (
    <BoardModifyForm
      board={board}
      isLoading={isLoading}
      onModify={onModify}
    />
  );
};

export default withRouter(BoardModifyContainer);
