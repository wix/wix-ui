import * as React from 'react';
import {createHOC} from '../../createHOC';

interface PaginationProps {
  numOfPages: number,
  currentPage?: number,
  roomForXPages?: number,
  onChange?: (event: {page: string}) => void,
  paginationMode?: 'pages' | 'input',
  showFirstLastButtons?: boolean,
  replaceArrowsWithText?: boolean,
  navButtonPlacement: 'inline' | 'top' | 'bottom',
  classes: {[s:string]:string};
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
      navButtonPlacement: 'inline',
      paginationMode: 'pages'
  };

  private currentPage: number = this.props.currentPage <= this.props.numOfPages ? this.props.currentPage : this.props.numOfPages;

  state = {
    pageInput: String(this.currentPage)
  };


  private onChange(page): void {
    (parseInt(page, 10) !== this.currentPage) && this.props.onChange({page})
  }
  
  private handlePageClick = (page: string): void => {
    if (
      ( (page === 'first' || page === 'previous') && this.currentPage === 1) || // don't trigger when clicking first page when in first page
      ( (page === 'last' || page === 'next') && this.currentPage === this.props.numOfPages) ||  // don't trigger when clicking last page when in last page
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
      className={pageContent === String(this.currentPage) ? this.props.classes.currentPage : this.props.classes.pageNumber}
      onClick={() => this.handlePageClick(pageContent)}>
        {pageContent}
      </span>
    ));
  }

  private getPages(): Array<string> {
    const {numOfPages, roomForXPages} = this.props;
    let startPage = 1, endPage = numOfPages;

    const numOfPagesToDisplay = (roomForXPages%2) ? roomForXPages : roomForXPages - 1;

    if (numOfPagesToDisplay < numOfPages ) {
      startPage = this.currentPage - Math.floor(numOfPagesToDisplay / 2);
      endPage = numOfPagesToDisplay + startPage - 1;
    }

    let result: Array<string> = [];
    for(let i = startPage; i <= endPage; i++ ) {
        result.push(String(i));
    }

    return result;
  };
  
  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newInput = e.target.value;
    if((newInput === parseInt(newInput,10).toString() && parseInt(newInput,10) > 0) || newInput === '') {
      this.setState({pageInput: e.target.value})
    }
  };
  
  private handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.keyCode;
    if(keyCode === 13) { // pressing enter
      this.handlePageInputCommit();
    }
  };
  
  private handlePageInputCommit = (e?: React.FocusEvent<HTMLInputElement>): void => {
    if (!this.state.pageInput) {
      return;
    } else if (parseInt(this.state.pageInput, 10) > this.props.numOfPages) {
      this.onChange(String(this.props.numOfPages))
    } else {
      this.onChange(this.state.pageInput);
    }

  };
  
  private createInputLayout = () => {
    return [
      <input
        data-hook="PAGE_INPUT"
        key="PAGE_INPUT"
        type="text"
        className={this.props.classes.inputField}
        value={this.state.pageInput}
        onChange={this.handlePageInputChange}
        onKeyDown={this.handlePageInputKeyDown}
        onBlur={this.handlePageInputCommit}/>,
      <span data-hook="PAGES_TOTAL" key="PAGES_TOTAL" className={this.props.classes.inputTotalPages}>/ {this.props.numOfPages}</span>
    ]
  };

  private renderNavButton(buttonType: NavButtonTypes): JSX.Element {

    const navButton = (name: string, content: string):JSX.Element => {
      return (
          <span
              key={name.toUpperCase()}
              data-hook={name.toUpperCase()}
              className={this.props.classes.pageNumber}
              onClick={() => this.handlePageClick(name)}>
            {content}
          </span>
      )
    }

    switch (buttonType) {
      case NavButtonTypes.FIRST: return navButton('first', this.props.replaceArrowsWithText ? 'First' : '<<');

      case NavButtonTypes.PREVIOUS: return navButton('previous', this.props.replaceArrowsWithText ? 'Previous' : '<');

      case NavButtonTypes.NEXT: return navButton('next',this.props.replaceArrowsWithText ? 'Next' : '>');

      case NavButtonTypes.LAST: return navButton('last', this.props.replaceArrowsWithText ? 'Last' : '>>');
    }
  }
  
  render() {
    const {navButtonPlacement, showFirstLastButtons, paginationMode, classes} = this.props;
    return (
      <div data-hook="PAGINATION" data-selected={this.currentPage} className={classes.paginationRoot}>
        {navButtonPlacement === 'top' ?
            <div data-hook="TOP_ROW">
              {[
                showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
                this.renderNavButton(NavButtonTypes.PREVIOUS),
                this.renderNavButton(NavButtonTypes.NEXT),
                showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
              ]}
            </div> : null
        }
        <div data-hook="MIDDLE_ROW">
          {navButtonPlacement === 'inline' ?
            [
              showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
              this.renderNavButton(NavButtonTypes.PREVIOUS)
            ] : null
          }
          <span data-hook="PAGES_SELECTION">
            { paginationMode === 'input' ? this.createInputLayout() : this.renderPages()}
          </span>

          {navButtonPlacement === 'inline' ?
            [
              this.renderNavButton(NavButtonTypes.NEXT),
              showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
            ] : null
          }
        </div>
        {navButtonPlacement === 'bottom' ?
          <div data-hook="BOTTOM_ROW">
            {[
              showFirstLastButtons && this.renderNavButton(NavButtonTypes.FIRST),
              this.renderNavButton(NavButtonTypes.PREVIOUS),
              this.renderNavButton(NavButtonTypes.NEXT),
              showFirstLastButtons && this.renderNavButton(NavButtonTypes.LAST)
            ]}
          </div> : null
        }
      </div>
    );
  };
}

export default createHOC(Pagination);