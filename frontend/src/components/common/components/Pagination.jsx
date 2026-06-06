import React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
    return (
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={onPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPageOptions={[3, 6, 10, 20]}
        />
    );
}
