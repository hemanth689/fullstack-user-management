import React, { useMemo, useState, useEffect } from 'react';
import UsersTable from '../../../components/Table/index.jsx';
import Pagination from '../../../components/common/components/Pagination.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/users/user.thunk.js';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';


export default function Users() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    }

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if(!term) return users;
        return users.filter((user) => {
            return user.username.toLowerCase().includes(term);
        })
    }, [users, searchTerm]);

    const paginatedUsers = useMemo(() => {
        const start = page * rowsPerPage;
        return filteredUsers.slice(start, start+rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        //here 10 represents radix to tell parseInt interpret the string as a base 10 - decimal.
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (error) {
        return (
            <h2 style={{ textAlign: 'center', color: 'red' }}>
            {t('Error fetching users')}: {error}
            </h2>
        );
    }
    

  return (
    <>
        <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
        </Backdrop>
        <h1 style={{textAlign:'center', marginTop:'20px', marginLeft:'100px'}}>{t('Registered Users')}</h1>
        <div style={{ marginLeft: '80px', marginBottom: '10px' }}>
            <input
                type="text"
                placeholder={t('search by username...')}
                value={searchTerm}
                onChange={handleSearch}
                style={{ width:'300px', height:'30px', padding:'20px', fontSize:'18px'}}
            />
        </div>
        <UsersTable users={paginatedUsers}/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination 
            count={filteredUsers.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
    </>
  );
}
