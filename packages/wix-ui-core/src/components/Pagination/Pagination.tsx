import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as PropTypes from 'prop-types';

interface PaginationProps {
  // data
  totalPages: number;
  currentPage?: number;
  // props
  roomForXPages?: number; //temp
  onChange?: (event: {page: string}) => void;
  paginationMode?: 'pages' | 'input';
  showFirstLastButtons?: boolean;
  replaceArrowsWithText?: boolean;
  firstText?: string;
  previousText?: string;
  nextText?: string;
  lastText?: string;
  navButtonPlacement?: 'inline' | 'top' | 'bottom';
  classes: {[s: string]: string};
}

interface PaginationState {
  pageInput: string;
}

enum NavButtonTypes {FIRST, PREVIOUS, NEXT, LAST}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  // this is a techincal debt - remove once we have support for typescript props in autodocs
  static propTypes = {
    /** The number of pages available to paginate */
    totalPages: PropTypes.number.isRequired,
    /** Current page to be shown as current. defaults to 1 */
    currentPage: PropTypes.number,
    /** Temp */
    roomForXPages: PropTypes.number,
    /** Callback to be called when pagination happens - structure ({page: string}) => () */
    onChange: PropTypes.func,
    /** Changes page selection mode between page selection and input field. defaults to 'pages'*/
    paginationMode: PropTypes.oneOf(['pages' , 'input']),
    /** Shows the 'first' and 'last' navigation buttons. defaults to false */
    showFirstLastButtons: PropTypes.bool,
    /** Allows replacing navigation arrows with textual buttons */
    replaceArrowsWithText: PropTypes.bool,
    /** Changes the location of the navigation buttons relative to the pages selection. defaults to 'inline'  */
    navButtonPlacement: PropTypes.oneOf(['inline' , 'top' , 'bottom']),
    /** Classes object */
    classes: PropTypes.object.isRequired
  };

  public static defaultProps: Partial<PaginationProps> = {
      currentPage: 1,
      showFirstLastButtons: false,
      replaceArrowsWithText: false,
      navButtonPlacement: 'inline',
      paginationMode: 'pages'
  };

  private currentPage: number = this.validateCurrentPage();

  state = {
    pageInput: String(this.currentPage)
  };

  private validateCurrentPage(): number {
    return Math.max(Math.min(this.props.currentPage, this.props.totalPages), 1);
  }

  private onChange(page): void {
    (parseInt(page, 10) !== this.currentPage) && this.props.onChange({page});
  }

  private handlePageClick = (page: string): void => {
    if (
      ( (page === 'first' || page === 'previous') && this.currentPage === 1) || // don't trigger when clicking first page when in first page
      ( (page === 'last' || page === 'next') && this.currentPage === this.props.totalPages) ||  // don't trigger when clicking last page when in last page
      (page === '...') // don't trigger for sibling page
    ) {
      return;
    }
    this.onChange(page);
  }

  private renderPages(): Array<JSX.Element> {
    const pages = this.getPages();

    return pages.map((pageContent, i) => (
      <span
      data-hook={'PAGE_' + i}
      key={'PAGE' + i}
      className={pageContent === String(this.currentPage) ? this.props.classes.currentPage : this.props.classes.pageNumber}
      onClick={() => this.handlePageClick(pageContent)}
      data-isSelected={pageContent === String(this.currentPage)}>
        {pageContent}
      </span>
    ));
  }

  private getPages(): Array<string> {
    const {totalPages, roomForXPages} = this.props;
    let startPage = 1, endPage = totalPages;

    const numOfPagesToDisplay = (roomForXPages % 2) ? roomForXPages : roomForXPages - 1;

    if (numOfPagesToDisplay < totalPages ) {
      startPage = this.currentPage - Math.floor(numOfPagesToDisplay / 2);
      endPage = numOfPagesToDisplay + startPage - 1;
    }

    let result: Array<string> = [];
    for (let i = startPage; i <= endPage; i++ ) {
        result.push(String(i));
    }

    return result;
  }

  private handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newInput = e.target.value;
    if ((newInput === parseInt(newInput, 10).toString() && parseInt(newInput, 10) > 0) || newInput === '') {
      this.setState({pageInput: e.target.value});
    }
  }

  private handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const keyCode = e.keyCode;
    if (keyCode === 13) { // pressing enter
      this.handlePageInputCommit();
    }
  }

  private handlePageInputCommit = (e?: React.FocusEvent<HTMLInputElement>): void => {
    if (!this.state.pageInput) {
      return;
    } else if (parseInt(this.state.pageInput, 10) > this.props.totalPages) {
      this.onChange(String(this.props.totalPages));
    } else {
      this.onChange(this.state.pageInput);
    }

  }

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
      <span data-hook="PAGES_TOTAL" key="PAGES_TOTAL" className={this.props.classes.inputTotalPages}>/ {this.props.totalPages}</span>
    ];
  }

  private renderNavButton(buttonType: NavButtonTypes): JSX.Element {

    const navButton = (name: string, content: string): JSX.Element => {
      return (
          <span
              key={name.toUpperCase()}
              data-hook={name.toUpperCase()}
              className={this.props.classes.pageNumber}
              onClick={() => this.handlePageClick(name)}>
            {content}
          </span>
      );
    };

    switch (buttonType) {
      case NavButtonTypes.FIRST: return navButton('first', this.props.replaceArrowsWithText ? this.props.firstText || 'First' : '<<');

      case NavButtonTypes.PREVIOUS: return navButton('previous', this.props.replaceArrowsWithText ? this.props.previousText || 'Previous' : '<');

      case NavButtonTypes.NEXT: return navButton('next', this.props.replaceArrowsWithText ? this.props.nextText || 'Next' : '>');

      case NavButtonTypes.LAST: return navButton('last', this.props.replaceArrowsWithText ? this.props.lastText || 'Last' : '>>');

      default: return null;
    }
  }

  render() {
    const {navButtonPlacement, showFirstLastButtons, paginationMode, classes} = this.props;
    this.currentPage = this.validateCurrentPage();

    return (
      <div data-hook="PAGINATION" className={classes.paginationRoot}>
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
  }
}

export default createHOC(Pagination);
