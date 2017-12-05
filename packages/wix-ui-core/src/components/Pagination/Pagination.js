import React from 'react';
import PropTypes from 'prop-types';
import {createHOC} from '../../createHOC';

/**
 * Toggle Switch
 */
class Pagination extends React.Component {
  
  handlePageClick = (page) => {
    if (
      (page === 'first' && this.props.currentPage === 1) || // don't trigger when clicking first page when in first page
      (page === 'last' && this.props.currentPage === this.props.numOfPages) ||  // don't trigger when clicking last page when in last page
      (page === '...') // don't trigger for sibling page
    ) {
      return;
    }
    this.props.onChange({page: page});
  };
  
  createPagesArray() {
    const {numOfPages, roomForXPages} = this.props;
    const isSiblingNeeded = numOfPages > roomForXPages;
    const amountOfPages = roomForXPages && (isSiblingNeeded ? roomForXPages : numOfPages) || numOfPages;
    const showSiblingOnIdx = isSiblingNeeded && amountOfPages - 2;
    
    let pagesArray = [];
    for (let i = 1; i <= amountOfPages; i++) {
      
      const pageContent = (
        i < showSiblingOnIdx ? i.toString() :
          i > showSiblingOnIdx ? (numOfPages - (amountOfPages - i)).toString() :
            '...'
      );
      
      pagesArray.push(
        <span
          data-hook={'PAGE_' + i}
          key={'PAGE' + i}
          onClick={() => this.handlePageClick(pageContent)}>
            {pageContent}
          </span>
      )
    }
    return pagesArray;
  }
  
  createInputLayout = () => {
    return [
      <input data-hook="PAGE_INPUT" key="PAGE_INPUT" value={this.props.currentPage} onChange={(e) => {}}/>,
      <span data-hook="PAGES_TOTAL" key="PAGES_TOTAL">/ {this.props.numOfPages}</span>
    ]
  };
  
  render() {
    return (
      <div data-hook="PAGINATION" data-selected={this.props.currentPage}>
        <span
          data-hook="FIRST"
          onClick={() => this.handlePageClick('first')}
          data-disabled={this.props.currentPage === 1}>
          First
        </span>
        <span data-hook="PREVIOUS" onClick={() => this.handlePageClick('previous')}>&lt;</span>
        { this.props.layout === 'INPUT' ? this.createInputLayout() : this.createPagesArray()}
        <span data-hook="NEXT" onClick={() => this.handlePageClick('next')}>&gt;</span>
        <span
          data-hook="LAST"
          onClick={() => this.handlePageClick('last')}
          data-disabled={this.props.currentPage === this.props.numOfPages}>
          Last
        </span>
      </div>
    );
  };
}

Pagination.propTypes = {
  numOfPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  roomForXPages: PropTypes.number,
  onChange: PropTypes.func,
  layout: PropTypes.string
};

Pagination.defaultProps = {
  currentPage: 1
};

export default createHOC(Pagination)
