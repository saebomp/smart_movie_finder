import React from 'react';
import Button from '@material-ui/core/Button';

const Pagination = ({limit2, handleNextPage,handlePrevPage}) => {
  return (
    <div className="next">
      {limit2 <= 10 ?
      <Button 
        variant="contained" 
        color="primary"
        onClick={handleNextPage}
        type="submit"
        value="submit"
        >
        Next page
      </Button>
      :
      <Button 
        variant="contained" 
        color="primary"
        onClick={handlePrevPage}
        type="submit"
        value="submit"
        >
        Previous page
      </Button>
      } 
    </div>
  )
}

export default Pagination;