import { useEffect, useMemo, useState } from 'react';

import UserCard from './components/UserCard';
import SearchInput from './components/SearchInput';
import Spinner from './components/Spinner';
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
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: IUser[] = await response.json();
      setUsers(data);
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
    <div className="container">
      {/* Search bar */}
      <SearchInput onChange={handleSearchInputChange} />

      {/* UI Feedback */}
      <section className="status-section">
        {!isLoading && !error && filteredUsers.length === 0 && (
          <p className="status-message no-users">No Users Found.</p>
        )}
        {isLoading && <Spinner />}
        {!isLoading && error && <p className="status-message error">{error}</p>}
      </section>

      {/* Users List */}
      {!isLoading && !error && filteredUsers.length > 0 &&
        <section className="user-grid">
          {filteredUsers.map(({ id, name, phone, company: { name: companyName } }) =>
            <UserCard key={id} name={name} phone={phone} companyName={companyName} />)}
        </section>}
    </div>
  );
};

export default App;
