import * as React from 'react';
import Pagination from "../src/components/Pagination";

const numOfPages = 13;

export class PaginationStory extends React.Component<{},{currPage: number}> {
    state = {
        currPage: 10
    }

    render() {
      console.log('Current Page: ', this.state.currPage);
      return (
        <Pagination
          numOfPages={numOfPages}
          roomForXPages={6}
          currentPage={this.state.currPage}
          showFirstLastButtons
          navButtonPlacement='inline'
          paginationMode='pages'
          onChange={(e) => {
            console.log(e)
            this.setState({currPage: e.page})
          }}/>
      )
    }
}