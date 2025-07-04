import { useEffect, useMemo, useState } from 'react';

import UserCard from './components/UserCard';
import useDebounce from './hooks/useDebounce';

import type { InputChangeEvent, IUser } from './types';
import './App.css';

const API_USERS = 'https://jsonplaceholder.typicode.com/users';

function App() {

  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearchTxt = useDebounce(searchTxt);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    // Reset UI feedback state before starting fetch
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(API_USERS);
      if (response.ok) {
        const data: IUser[] = await response.json();
        setUsers(data);
      } else {
        throw new Error(`Error: ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setUsers([]);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInputChange = ({ target: { value } }: InputChangeEvent) => {
    setSearchTxt(value);
  };

  // useMemo to optimize filtering for large user lists
  const filteredUsers = useMemo(() => users.filter(({ name }) => {
    return name.toLowerCase().includes(debouncedSearchTxt.toLowerCase());
  }), [users, debouncedSearchTxt]);

  return (
    <div>
      <input
        placeholder='Search'
        value={searchTxt}
        onChange={handleSearchInputChange} />
      <button type='button' onClick={fetchUsers} disabled={isLoading}>{isLoading ? 'Loading...' : 'Reload List'}</button>

      {/* No Users */}
      {!isLoading && !error && filteredUsers.length === 0 && <div> No Users Found.</div>}

      {/* Loading State */}
      {isLoading && <div>Loading...</div>}

      {/* Error State */}
      {error && <div>{error}</div>}

      {/* Users List */}
      {!isLoading && !error && filteredUsers.length > 0 &&
        filteredUsers.map(({ id, name, phone, company: { name: companyName } }) =>
          <UserCard key={id} name={name} phone={phone} companyName={companyName} />)}
    </div>
  );
};

export default App;
