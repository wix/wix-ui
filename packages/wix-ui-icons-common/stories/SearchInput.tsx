import React, { ChangeEvent } from "react";
import { Search } from "wix-ui-icons-common";
import uiStyles from "wix-storybook-utils/dist/src/ui/styles.scss";
import { st, classes } from "./index.story.st.css";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <div className={classes.search}>
      <input
        onChange={onChange}
        placeholder="Search Icons"
        className={st(classes.searchInput, {}, uiStyles.input)}
      />
      <Search className={classes.searchIcon} />
    </div>
  );
};

export default SearchInput;
