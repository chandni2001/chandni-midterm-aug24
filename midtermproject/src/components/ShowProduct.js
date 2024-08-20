import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function ShowProduct() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3000/api/v1/products')
      .then(response => {
        setData(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        alert('Error fetching products.');
      });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredData = data.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Description', selector: row => row.description },
    { name: 'Status', selector: row => row.status ? 'Active' : 'Inactive' },
    { name: 'Price', selector: row => row.price, sortable: true },
  ];

  const ExpandableComponent = ({ data }) => (
    <div style={{ padding: '20px' }}>
      <h3>Product Details</h3>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Description:</strong> {data.description}</p>
      <p><strong>Status:</strong> {data.status ? 'Active' : 'Inactive'}</p>
      <p><strong>Price:</strong> ${data.price}</p>
      <p><strong>Created At:</strong> {new Date(data.created_at).toLocaleDateString()}</p>
      <p><strong>Updated At:</strong> {new Date(data.updated_at).toLocaleDateString()}</p>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Product List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[3, 5, 10]}
        expandableRows
        expandableRowsComponent={<ExpandableComponent />}
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}

export default ShowProduct;
