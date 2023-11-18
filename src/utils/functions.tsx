import { IUser } from "../types/userTypes";

const findAllOccurrences = (
  mainString: string,
  subString: string
): number[] => {
  if (subString) {
    const occurrences: number[] = [];
    let currentIndex = mainString.indexOf(subString);

    while (currentIndex !== -1) {
      occurrences.push(currentIndex);
      currentIndex = mainString.indexOf(subString, currentIndex + 1);
    }

    return occurrences;
  } else return [];
};

export const viewSearchText = (
  value: string,
  searchText: string,
  color: string
) => {
  if (value.includes(searchText)) {
    const result: string[] = [];
    let currentIndex = 0;
    const indexisOccurrences = findAllOccurrences(value, searchText);
    indexisOccurrences.forEach((position) => {
      if (currentIndex !== position) {
        result.push(value.substring(currentIndex, position));
      }
      result.push(searchText);
      currentIndex = position + searchText.length;
    });

    if (currentIndex !== value.length) {
      result.push(value.substring(currentIndex));
    }

    return (
      <span>
        {result.map((el, key) => {
          if (el === searchText) {
            return (
              <span style={{ color, backgroundColor: "pink" }} key={key}>
                {el}
              </span>
            );
          } else {
            return el;
          }
        })}
      </span>
    );
  } else {
    return <span>{value}</span>;
  }
};

const isIncludeValue = (text: string, value: string) => {
  return text.includes(value);
};

export const filteredUsers = (
  users: IUser[],
  value: string,
  removeUserIds: number[]
) => {
  const res = users
    .filter((user) => {
      return !removeUserIds.includes(user.id);
    })
    .filter(
      (user) =>
        isIncludeValue(user.name, value) ||
        isIncludeValue(user.username, value) ||
        isIncludeValue(user.email, value)
    );
  return res;
};
