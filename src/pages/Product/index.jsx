import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.kalpav.com/api/v1/product/category/retail');
        console.log('response: ', response);
        setProducts(response.data.response); // Assuming the API response is an array of products
        setLoading(false);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    // Filter products based on the search term
    const filtered = products.filter((product) =>
      product.productCategory.productCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    
    // <div>
        <div>
          <div>
      <h2>Product List</h2>
      <Link to="/about">About</Link>
      </div>
      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

     
       <TextField
        label="Search by Product Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      
    {/* </div> */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {searchTerm
          ? filteredProducts.map((product) => (
              <Card key={product.productCategory.productCategoryId} sx={{ width: 300 }}>
                <img
                  src={product.productCategory.productCategoryImage}
                  alt={product.productCategory.productCategoryName}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <CardContent>
                  <Typography variant="h6">{product.productCategory.productCategoryName}</Typography>
                </CardContent>
              </Card>
            ))
          : products.map((product) => (
              <Card key={product.productCategory.productCategoryId} sx={{ width: 300 }}>
                <img
                  src={product.productCategory.productCategoryImage}
                  alt={product.productCategory.productCategoryName}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <CardContent>
                  <Typography variant="h6">{product.productCategory.productCategoryName}</Typography>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default Product;
