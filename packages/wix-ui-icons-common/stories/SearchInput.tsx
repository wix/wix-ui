import React, { ChangeEvent } from "react";
import { Search } from "wix-ui-icons-common";
import Input from "wix-storybook-utils/dist/src/ui/input";
import { classes } from "./SearchInput.st.css";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<Props> = ({ onChange }) => {
  return (
    <div className={classes.root}>
      <Input
        onChange={onChange}
        placeholder="Search Icons"
        className={classes.input}
      />
      <Search className={classes.icon} />
    </div>
  );
};

export default SearchInput;
