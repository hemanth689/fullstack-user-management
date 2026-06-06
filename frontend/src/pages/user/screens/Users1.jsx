import React, { useMemo, useState, useEffect } from 'react';
import UsersTable from '../../../components/Table/index.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../../redux/users/user.thunk.js';
import { Backdrop, CircularProgress } from '@mui/material';
import DownloadUsers from '../../../components/Table/components/DownloadUsers.jsx'

export default function Users() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(10);

  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setDisplayCount(10);
  };

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter((user) =>
      user.username.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const visibleUsers = useMemo(() => {
    return filteredUsers.slice(0, displayCount);
  }, [filteredUsers, displayCount]);

  const fetchMoreData = () => {
    if (displayCount < filteredUsers.length) {
      setDisplayCount((prev) => Math.min(prev + 10, filteredUsers.length));
    }
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
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginLeft: '100px' }}>
        {t('Registered Users')}
      </h1>
      <DownloadUsers />
      <div style={{ marginLeft: '80px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder={t('search by username...')}
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '300px', height: '30px', padding: '20px', fontSize: '18px' }}
        />
      </div>

      <InfiniteScroll
        dataLength={visibleUsers.length}
        next={fetchMoreData}
        hasMore={visibleUsers.length < filteredUsers.length}
        loader={<h4 style={{ textAlign: 'center' }}>{t('Loading more users...')}</h4>}
        endMessage={
          filteredUsers.length > 0 && (
            <p style={{ textAlign: 'center' }}>
              <b>{t('No more users to display.')}</b>
            </p>
          )
        }
      >
        <UsersTable users={visibleUsers} />
      </InfiniteScroll>

      {filteredUsers.length === 0 && !loading && (
        <div style={{ textAlign: 'center', margin: '20px', fontSize: '18px' }}>
          {t('No users found.')}
        </div>
      )}
    </>
  );
}
