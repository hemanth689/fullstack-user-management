import React, { useMemo, useState, useEffect } from 'react';
import UsersTable from '../../../components/Table/components/DragUsers';
import useFetchUsers from '../hooks/useFetchUsers';
import { useTranslation } from 'react-i18next';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";


export default function Users() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [displayCount, setDisplayCount] = useState(10);
    const { users: fetchedUsers, loading } = useFetchUsers(import.meta.env.VITE_API_URL);
    const [users, setUsers] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        setUsers(fetchedUsers);
    }, [fetchedUsers]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setDisplayCount(10);
    };

    const filteredUsers = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return users;
        return users.filter((user) => user.username.toLowerCase().includes(term));
    }, [users, searchTerm]);

    const visibleUsers = useMemo(() => {
        return filteredUsers.slice(0, displayCount);
    }, [filteredUsers, displayCount]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return; // safety check
        if (active.id !== over.id) {
            const oldIndex = users.findIndex((user) => user.id === active.id);
            const newIndex = users.findIndex((user) => user.id === over.id);
            setUsers((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };
    const handleLoadMore = () => {
        if (displayCount < filteredUsers.length) {
          setLoadingMore(true);
      
          setTimeout(() => {
            setDisplayCount((prev) => Math.min(prev + 10, filteredUsers.length));
            setLoadingMore(false);
          }, 500); // simulate delay
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '20px', marginLeft: '100px' }}>{t('Registered Users')}</h1>

            <div style={{ marginLeft: '80px', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder={t('search by username...')}
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: '300px', height: '30px', padding: '20px', fontSize: '18px' }}
                />
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={visibleUsers.map((user) => user.id)} strategy={verticalListSortingStrategy}>
                    <UsersTable users={visibleUsers} />
                </SortableContext>
            </DndContext>

            {displayCount < filteredUsers.length && (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    {loadingMore ? (
                    <CircularProgress size={30} />
                    ) : (
                    <Button variant="contained" onClick={handleLoadMore}>
                        {t('Load More')}
                    </Button>
                    )}
                </div>
            )}

            {filteredUsers.length === 0 && (
                <div style={{ textAlign: 'center', margin: '20px', fontSize: '18px' }}>
                    {t('No users found.')}
                </div>
            )}
        </>
    );
}
