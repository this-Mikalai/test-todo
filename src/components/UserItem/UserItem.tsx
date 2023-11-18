import { FC, MouseEvent } from "react";
import { IUser } from "../../types/userTypes";
import { viewSearchText } from "../../utils/functions";
import "./UserItem.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  getActiveUserId,
  handleShowModal,
} from "../../store/slices/UserReducer";
interface IItem {
  user: IUser;
  removeUser: (id: number) => void;
  searchValue: string;
}

const UserItem: FC<IItem> = (props) => {
  const { user, removeUser, searchValue } = props;
  const dispatch = useAppDispatch();

  const userEvent = () => {
    dispatch(handleShowModal(true));
    dispatch(getActiveUserId(user.id));
  };

  const deleteUser = (e: MouseEvent<HTMLButtonElement>) => {
    removeUser(user.id);
    e.stopPropagation();
  };

  return (
    <>
      <li className="item" onClick={userEvent}>
        <>{viewSearchText(user.name, searchValue, "red")}</>
        <>{viewSearchText(user.username, searchValue, "red")}</>
        <>{viewSearchText(user.email, searchValue, "red")}</>
        <button onClick={(e) => deleteUser(e)}>Delete</button>
      </li>
    </>
  );
};

export default UserItem;
