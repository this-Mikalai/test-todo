import React, { FC } from "react";
import UserItem from "../../components/UserItem/UserItem";
import { IUser } from "../../types/userTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { removeUserById } from "../../store/slices/UserReducer";
import "./ListItems.scss";
interface IListItem {
  users: IUser[];
}

const ListItems: FC<IListItem> = (props) => {
  const { users } = props;
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.user);

  const removeUser = (id: number) => {
    dispatch(removeUserById(id));
  };

  return (
    <ul className="list">
      {users.length ? (
        users.map((user) => {
          return (
            <UserItem
              key={user.id}
              user={user}
              removeUser={removeUser}
              searchValue={searchValue}
            />
          );
        })
      ) : (
        <div>No data</div>
      )}
    </ul>
  );
};

export default ListItems;
