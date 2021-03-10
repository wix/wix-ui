import React from "react";

export type PlaceholderProps = {
  skin: 'light' | 'dark';
  height: number | string;
  width: number | string;
  children: React.ReactNode;
}
