import * as React from "react";
import { ChangeEvent } from "react";
import { Search } from "wix-ui-icons-common";
import Input from "wix-storybook-utils/dist/src/ui/input";
import { classes } from "./SearchInput.st.css";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  dataHook?: string;
};

const SearchInput: React.FC<Props> = ({ onChange, dataHook }) => {
  return (
    <div className={classes.root}>
      <Input
        onChange={onChange}
        placeholder="Search Icons"
        className={classes.input}
        data-hook={dataHook}
      />
      <Search className={classes.icon} />
    </div>
  );
};

export default SearchInput;
