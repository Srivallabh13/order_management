// src/components/SearchBar.jsx
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
        label="Search"
        variant="outlined"
        size="small"
        value={query}
        onChange={handleChange}
        style={{ marginRight: '8px' }}
      />
      <IconButton onClick={() => dispatch(Search(query))} color="primary">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;

//both button and dynamically trigerring when string is input
// src/components/SearchBar.jsx
// import React, { useState,useEffect } from 'react';
// import { TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useDispatch } from 'react-redux';
// import { Search } from '../Actions/ProductActions';
// import { useNavigate } from 'react-router-dom';

//     const SearchBar = () => {
//     const [query, setQuery] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
  
//     const handleChange = (event) => {
//       const value = event.target.value;
//       setQuery(value);
//       dispatch(Search(value));
//     };
  
//     const handleSearch = () => {
//       dispatch(Search(query));
//     };
  

//   useEffect(() => {
//     if (query === '') {
//       dispatch(Search(''));
//     }
//   }, [query, dispatch]);

//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         value={query}
//         onChange={handleChange}
//         style={{ marginRight: '8px' }}
//       />
//       <IconButton onClick={handleSearch} color="primary">
//         <SearchIcon />
//       </IconButton>
//     </div>
//   );
// };

// export default SearchBar;

