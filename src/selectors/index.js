import { createSelector } from "reselect";
import { BLOCKS_PER_PAGE } from "../types";

export const getPage = ({ blocks }) => blocks.page;
export const getBlocks = ({ blocks }) => blocks.blocksArr;

export const getVisibleBlocks = createSelector(
  [getPage, getBlocks],
  (page, blocks) => {
    const index = blocks.length - BLOCKS_PER_PAGE * page;
    return blocks.slice(index, index + BLOCKS_PER_PAGE);
  },
);
