import { useState, useEffect } from 'react';

export default function useFetchUsers(apiUrl) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return { users, loading };
}
