import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
        setSuggestions(data.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [value]);

  return (
    <div>
      <TextField
        placeholder="Search data..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
      {/* Display suggestions here */}
    </div>
  );
};

export default SearchBar;
