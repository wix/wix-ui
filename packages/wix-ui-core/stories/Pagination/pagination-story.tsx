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
      <div>
        <div>
          <Pagination
            dataHook="story-pagination"
            totalPages={numOfPages}
            roomForXPages={6}
            currentPage={this.state.currPage}
            showFirstLastButtons
            onChange={this.handleChange}
            direction="rtl"
            />
        </div>
        <div>
          <Pagination
            dataHook="story-pagination-rtl"
            direction="rtl"
            numOfPages={numOfPages}
            roomForXPages={6}
            currentPage={this.state.currPage}
            showFirstLastButtons
            onChange={this.handleChange}/>
        </div>
        <div>
          <Pagination
            dataHook="story-pagination-responsive-numbering"
            direction="rtl"
            numOfPages={numOfPages}
            roomForXPages={6}
            currentPage={this.state.currPage}
            showFirstLastButtons
            onChange={this.handleChange}/>
        </div>
    </div>
    );
  }
}
