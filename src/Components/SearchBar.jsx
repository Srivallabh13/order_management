import React, { useState,useEffect } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { Search } from '../Actions/ProductActions';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleChange = (event) => {
      const value = event.target.value;
      setQuery(value);
      dispatch(Search(value));
    };

    const handleSearch = () => {
      navigate('/search');
      dispatch(Search(query));
    };

  useEffect(() => {
    if (query === '') {
      dispatch(Search(''));
    }
  }, [query, dispatch]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder='Search'
        size="small"
        value={query}
        onChange={handleChange}
        sx={{
            backgroundColor: "white",
            borderRadius: "100px",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
      />
      <IconButton onClick={handleSearch} color="primary">
        <SearchIcon color='warning'/>
      </IconButton>
    </div>
  );
};

export default SearchBar;
