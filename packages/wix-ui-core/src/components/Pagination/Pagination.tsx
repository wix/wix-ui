import * as React from 'react';
import {createHOC} from '../../createHOC';
import * as PropTypes from 'prop-types';
import * as  classNames from 'classnames';

interface PaginationProps {
  // data
  totalPages: number;
  currentPage?: number;
  // props
  onChange?: (event: {page: string}) => void;
  paginationMode?: 'pages' | 'input';
  showFirstLastNavButtons?: boolean;
  replaceArrowsWithText?: boolean;
  firstText?: string;
  previousText?: string;
  nextText?: string;
  lastText?: string;
  direction?: 'ltr' | 'rtl';
  width?: number;
  alwaysShowFirstPage?: boolean;
  alwaysShowLastPage?: boolean;
  showInputModeTotalPages: boolean;
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
    /** Callback to be called when pagination happens - structure ({page: string}) => () */
    onChange: PropTypes.func,
    /** Changes page selection mode between page selection and input field. defaults to 'pages'*/
    paginationMode: PropTypes.oneOf(['pages' , 'input']),
    /** Shows the 'first' and 'last' navigation buttons. defaults to false */
    showFirstLastNavButtons: PropTypes.bool,
    /** Allows replacing navigation arrows with textual buttons */
    replaceArrowsWithText: PropTypes.bool,
    /** Text to appear for the 'first' navigation button when prop 'replaceArrowsWithText' is true */
    firstText: PropTypes.string,
    /** Text to appear for the 'previous' navigation button when prop 'replaceArrowsWithText' is true */
    previousText: PropTypes.string,
    /** Text to appear for the 'next' navigation button when prop 'replaceArrowsWithText' is true */
    nextText: PropTypes.string,
    /** Text to appear for the 'last' navigation button when prop 'replaceArrowsWithText' is true */
    lastText: PropTypes.string,
    /** The pagination direction. acceots 'ltr' (left to right) or 'rtl' (right to left). defaults to 'ltr' */
    direction: PropTypes.oneOf(['ltr' , 'rtl']),
    /** The pixel width the component will render in  */
    width: PropTypes.number,
    /** Whether the page numbers always show the first page  */
    alwaysShowFirstPage: PropTypes.bool,
    /** Whether the page numbers always show the last page  */
    alwaysShowLastPage: PropTypes.bool,
    /** Whether the to show the total amount of pages next to the input field in "input" paginationMode  */
    showInputModeTotalPages: PropTypes.bool,
    /** Classes object */
    classes: PropTypes.object.isRequired
  };

  public static defaultProps: Partial<PaginationProps> = {
    currentPage: 1,
    showFirstLastNavButtons: false,
    replaceArrowsWithText: false,
    paginationMode: 'pages',
    direction: 'ltr',
    showInputModeTotalPages: false
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
    let result: Array<string> = [];
    for (let i = 1; i <= this.props.totalPages; i++ ) {
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
      this.props.showInputModeTotalPages && <span data-hook="PAGES_TOTAL" key="PAGES_TOTAL" className={this.props.classes.inputTotalPages}>/ {this.props.totalPages}</span>,
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
    const {showFirstLastNavButtons, paginationMode, classes} = this.props;
    this.currentPage = this.validateCurrentPage();

    return (
      <div data-hook="PAGINATION" className={classNames(classes.paginationRoot, {[classes.rtl]: this.props.direction === 'rtl'})}>
        {[
          showFirstLastNavButtons && this.renderNavButton(NavButtonTypes.FIRST),
          this.renderNavButton(NavButtonTypes.PREVIOUS)
        ]}
          <span data-hook="PAGES_SELECTION" className={classNames(classes.pagesSelection, {[classes.rtl]: this.props.direction === 'rtl'})}>
            { paginationMode === 'input' ? this.createInputLayout() : this.renderPages()}
          </span>
        {[
          this.renderNavButton(NavButtonTypes.NEXT),
          showFirstLastNavButtons && this.renderNavButton(NavButtonTypes.LAST)
        ]}
        </div>
    );
  }
}

export default createHOC(Pagination);
