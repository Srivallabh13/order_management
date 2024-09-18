import React, { useState,useEffect, useRef } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { Search } from '../Actions/ProductActions';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
  
    const handleChange = (event) => {
      const value = event.target.value;
      setQuery(value);
      dispatch(Search(value));
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
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

  useEffect(() => {
    const searchInputNode = searchInputRef.current;
    if (searchInputNode) {
      searchInputNode.addEventListener('keypress', handleKeyPress);
    }
    return () => {
      if (searchInputNode) {
        searchInputNode.removeEventListener('keypress', handleKeyPress);
      }
    };
  }, [handleKeyPress]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        placeholder='Search'
        size="small"
        inputRef={searchInputRef}
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
