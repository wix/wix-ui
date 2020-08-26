import React, { ChangeEvent } from "react";
import { Search } from "wix-ui-icons-common";
import Input from "wix-storybook-utils/dist/src/ui/input";
import { classes } from "./index.story.st.css";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <div className={classes.search}>
      <Input
        onChange={onChange}
        placeholder="Search Icons"
        className={classes.searchInput}
      />
      <Search className={classes.searchIcon} />
    </div>
  );
};

export default SearchInput;
