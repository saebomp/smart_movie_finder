import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({total_pages, page, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"prev"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={total_pages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName={"pagination"}
      activeClassName={"active"}
      forcePage={page-1}
      onPageChange={handlePageClick}
      // onKeyPress={this.pageSelectedHandler}
    />
  )
  
}

export default Pagination