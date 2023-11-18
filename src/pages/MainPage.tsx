import React, { useCallback, useEffect, useMemo, useState } from "react";
import ListItems from "../modules/ListItems/ListItems";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  filterUsersBySearchValue,
  getSearchValue,
  getUsers,
  handleShowModal,
  resetChanges,
} from "../store/slices/UserReducer";
import Modal from "../components/Modal/Modal";
import InfoUser from "../modules/InfoUser/InfoUser";
import SearchPanel from "../modules/SearchPanel/SearchPanel";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { changedUsers, isShowModal } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const getTextValue = useCallback(
    (text: string) => {
      dispatch(getSearchValue(text));
      dispatch(filterUsersBySearchValue(text));
      setSearchValue(text);
    },
    [dispatch]
  );

  const resetLocalChanges = useCallback(() => {
    dispatch(resetChanges());
    dispatch(getSearchValue(""));
    setSearchValue("");
  }, [dispatch]);

  const handleOpenModal = (bool: boolean) => {
    dispatch(handleShowModal(bool));
  };

  const memoValue = useMemo(() => searchValue, [searchValue]);

  return (
    <>
      {isShowModal && (
        <Modal closeModal={handleOpenModal}>
          <>
            <InfoUser />
          </>
        </Modal>
      )}
      <SearchPanel
        searchValue={memoValue}
        resetLocalChanges={resetLocalChanges}
        getTextValue={getTextValue}
      />
      <ListItems users={changedUsers} />
    </>
  );
};

export default MainPage;
