import React from 'react';
import { fetchUsers } from '../../../redux/users/user.thunk';
import { useDispatch } from 'react-redux';
import { Button, Box } from '@mui/material';

const CSVDownloader = () => {
    const dispatch = useDispatch();

    const fetchData = async () => {
        const action = await dispatch(fetchUsers());
        return action.payload || [];
    };

    const convertToCSV = (data) => {
        if (!data.length) return '';

        const headers = Object.keys(data[0]).join(',') + '\n';
        const rows = data
            .map(row =>
                Object.values(row)
                    .map(val => `"${String(val).replace(/"/g, '""')}"`)
                    .join(',')
            )
            .join('\n');

        return headers + rows;
    };

    const downloadCSV = async () => {
        const data = await fetchData();
        const csv = convertToCSV(data);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <Box display="flex" justifyContent="flex-end" mr={10}>
            <Button variant="outlined" onClick={downloadCSV}>
                Download Users
            </Button>
        </Box>
    );
}

export default CSVDownloader;