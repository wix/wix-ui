import * as React from 'react';
import Pagination from '../../src/components/Pagination';

const numOfPages = 13;

export class PaginationStory extends React.Component<{}, { currPage: number }> {
  state = {
    currPage: 10
  };

  handleChange = e => {
    switch (e.page) {
      case 'first' :
        this.setState({currPage: 1});
        break;
      case 'last' :
        this.setState({currPage: numOfPages});
        break;
      case 'next' :
        this.setState({currPage: this.state.currPage + 1});
        break;
      case 'previous' :
        this.setState({currPage: this.state.currPage - 1});
        break;
      default:
        this.setState({currPage: parseInt(e.page, 10)});
    }
  }

  render() {
    return (
      <Pagination
        dataHook="story-pagination"
        numOfPages={numOfPages}
        roomForXPages={6}
        currentPage={this.state.currPage}
        showFirstLastButtons
        navButtonPlacement="inline"
        paginationMode="pages"
        onChange={this.handleChange}/>
    );
  }
}
