import { useCallback, useMemo, useState } from 'react';
import { normalize } from './utils/normalize';
import { EMPLOYEES } from './data/employees';
import type { Employee } from './data/types';
import { EmployeeItem } from './components/EmployeeItem';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    setSearchTerm(text);
    const newTerm = normalize(text);

    if (!newTerm.length) {
      setSearchResults([]);
      return;
    }

    const results = EMPLOYEES.filter((emp) => {
      if (normalize(emp.name).includes(newTerm)) {
        return true;
      }

      return emp.services.some((ser) => {
        return (
          normalize(ser.label).includes(newTerm) ||
          normalize(ser.category).includes(newTerm)
        );
      });
    });

    setSearchResults(results);
  }, []);

  const renderItem = useCallback(
    (item: Employee) => {
      return (
        <EmployeeItem
          key={item.name}
          data={item}
          currentSearchTerm={searchTerm}
        />
      );
    },
    [searchTerm],
  );

  const Empty = useMemo(() => {
    if (searchTerm.trim().length) {
      return <div style={styles.noResults}>No Results</div>;
    }
    return null;
  }, [searchTerm]);

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Beka, SR Face Shave, Wax..."
        onChange={handleSearch}
      />
      <div style={styles.list}>
        {searchResults.length === 0
          ? Empty
          : searchResults.map((emp) => renderItem(emp))}
      </div>
    </div>
  );
}

export default App;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    gap: 12,
  },
  list: {
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    border: '2px solid rgb(217,217,217)',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: '6px 12px',
    fontSize: 20,
    color: '#000',
    outline: 'none',
  },
  noResults: {
    color: 'white',
    fontWeight: 'bold',
  },
};
