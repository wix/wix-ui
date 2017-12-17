import * as React from 'react';
import {createHOC} from '../../createHOC';

interface PaginationProps {
  numOfPages: number,
  currentPage?: number,
  roomForXPages?: number,
  onChange?: (event: {page: string}) => void,
  layout?: string,
  showFirstLastButtons?: boolean,
  replaceArrowsWithText?: boolean,
  navButtonPlacement: 'inline' | 'top' | 'bottom'
}

interface PaginationState {
  pageInput: string
}

enum NavButtonTypes {FIRST, PREVIOUS, NEXT, LAST}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  public static defaultProps: Partial<PaginationProps> = {
      currentPage: 1,
      showFirstLastButtons: false,
      replaceArrowsWithText: false,
      navButtonPlacement: 'inline'
  };

  state = {
    pageInput: String(this.props.currentPage)
  };
  
  private onChange(page): void{
    this.props.onChange({page})
  }
  
  private handlePageClick = (page: string): void => {
    if (
      ( (page === 'first' || page === 'previous') && this.props.currentPage === 1) || // don't trigger when clicking first page when in first page
      ( (page === 'last' || page === 'next') && this.props.currentPage === this.props.numOfPages) ||  // don't trigger when clicking last page when in last page
      (page === '...') // don't trigger for sibling page
    ) {
      return;
    }
    this.onChange(page);
  };
  
  private renderPages(): Array<JSX.Element> {
    const pages = this.getPages();

    return pages.map((pageContent, i) => (
      <span
      data-hook={'PAGE_' + i}
      key={'PAGE' + i}
      onClick={() => this.handlePageClick(pageContent)}>
        {pageContent}
      </span>
    ));
  }

  private getPages(): Array<string> {
    const {numOfPages, roomForXPages, currentPage} = this.props;
    let startPage = 1, endPage = numOfPages;

    const numOfPagesToDisplay = (roomForXPages%2) ? roomForXPages : roomForXPages - 1;

    if (numOfPagesToDisplay < numOfPages ) {
      startPage = currentPage - Math.floor(numOfPagesToDisplay / 2);
      endPage = numOfPagesToDisplay + startPage - 1;
    }

    let result: Array<string> = [];
    for(let i = startPage; i <= endPage; i++ ) {
        result.push(String(i));
    }

    return result;
  };
  
  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    if((newInput === parseInt(newInput,10).toString() && parseInt(newInput,10) > 0) || newInput === '') {
      this.setState({pageInput: e.target.value})
    }
  };
  
  private handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    if(keyCode === 13) { // pressing enter
      this.handlePageInputCommit();
    }
  };
  
  private handlePageInputCommit = (e?: React.FocusEvent<HTMLInputElement>) => {
    this.state.pageInput &&
    parseInt(this.state.pageInput, 10) !== this.props.currentPage &&
    this.onChange(this.state.pageInput)
  };
  
  private createInputLayout = () => {
    return [
      <input
        data-hook="PAGE_INPUT"
        key="PAGE_INPUT"
        type="text"
        value={this.state.pageInput}
        onChange={this.handlePageInputChange}
        onKeyDown={this.handlePageInputKeyDown}
        onBlur={this.handlePageInputCommit}/>,
      <span data-hook="PAGES_TOTAL" key="PAGES_TOTAL">/ {this.props.numOfPages}</span>
    ]
  };

  private renderNavButton(buttonType: NavButtonTypes): JSX.Element {
    switch (buttonType) {
      case NavButtonTypes.FIRST: return (
        <span
            key="FIRST"
            data-hook="FIRST"
            onClick={() => this.handlePageClick('first')}>
          {this.props.replaceArrowsWithText ? 'First' : '<<'}
        </span>
      );
      case NavButtonTypes.PREVIOUS: return (
        <span key="PREVIOUS" data-hook="PREVIOUS" onClick={() => this.handlePageClick('previous')}>
          {this.props.replaceArrowsWithText ? 'Previous' : '<'}
        </span>
      );

      case NavButtonTypes.NEXT: return (
        <span key="NEXT"data-hook="NEXT" onClick={() => this.handlePageClick('next')}>
        {this.props.replaceArrowsWithText ? 'Next' : '>'}
        </span>
      );

      case NavButtonTypes.LAST: return (
        <span
            key="LAST"
            data-hook="LAST"
            onClick={() => this.handlePageClick('last')}>
          {this.props.replaceArrowsWithText ? 'Last' : '>>'}
        </span>
      );
    }
  }
  
  render() {
    return (
      <div data-hook="PAGINATION" data-selected={this.props.currentPage}>
        {this.props.navButtonPlacement === 'top' ?
            <div data-hook="TOP_ROW">
              {[
                this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
                this.renderNavButton(NavButtonTypes.PREVIOUS),
                this.renderNavButton(NavButtonTypes.NEXT),
                this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
              ]}
            </div> : null
        }
        <div data-hook="MIDDLE_ROW">
          {this.props.navButtonPlacement === 'inline' ?
            [
              this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
              this.renderNavButton(NavButtonTypes.PREVIOUS)
            ] : null
          }

          { this.props.layout === 'INPUT' ? this.createInputLayout() : this.renderPages()}

          {this.props.navButtonPlacement === 'inline' ?
            [
              this.renderNavButton(NavButtonTypes.NEXT),
              this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
            ] : null
          }
        </div>
        {this.props.navButtonPlacement === 'bottom' ?
          <div data-hook="BOTTOM_ROW">
            {[
              this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
              this.renderNavButton(NavButtonTypes.PREVIOUS),
              this.renderNavButton(NavButtonTypes.NEXT),
              this.props.showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
            ]}
          </div> : null
        }
      </div>
    );
  };
}

export default createHOC(Pagination);