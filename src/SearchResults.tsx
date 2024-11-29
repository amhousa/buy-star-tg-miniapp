// src/SearchResults.tsx
import React from 'react';

interface SearchResultsProps {
  results: any[];
  onSelect: (user: any) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  return (
    <div>
      {results.map((user) => (
        <div key={user.id} onClick={() => onSelect(user)}>
          <img src={user.photo_url} alt={user.username} />
          <p>{user.first_name} {user.last_name}</p>
          <p>@{user.username}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
