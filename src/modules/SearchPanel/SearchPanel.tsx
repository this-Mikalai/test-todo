import React, { FC, memo } from "react";
import "./SearchPanel.scss";

interface ISearchPanel {
  searchValue: string;
  getTextValue: (str: string) => void;
  resetLocalChanges: () => void;
}

const SearchPanel: FC<ISearchPanel> = memo((props) => {
  console.log("render SearchPanel");

  const { searchValue, getTextValue, resetLocalChanges } = props;
  return (
    <div className="block-search">
      <input
        type="text"
        onChange={(e) => getTextValue(e.target.value)}
        value={searchValue}
      />
      <button onClick={resetLocalChanges}>Reset</button>
    </div>
  );
});

export default SearchPanel;
