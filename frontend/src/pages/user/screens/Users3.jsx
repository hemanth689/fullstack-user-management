import React, { useMemo, useState, useEffect } from 'react';
import UsersTable from '../../../components/Table/index.jsx';
import CustomPagination from '../../../components/common/components/CustomPagination.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/users/user.thunk.js';
import { useTranslation } from 'react-i18next';
import { Backdrop, CircularProgress } from '@mui/material';


export default function Users() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setPage(0);
    }

    const { users, loading, error } = useSelector((state) => state.users);

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

    const rowsPerPage = 5;

    const paginatedUsers = useMemo(() => {
        const start = page * rowsPerPage;
        return filteredUsers.slice(start, start+rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

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
        <CustomPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
        />
    </>
  );
}