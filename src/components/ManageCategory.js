import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import Apis from '../Apis';
import config from "../Config";
const baseUrl = config.BASE_URL;
const ManageCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/admin/allcategory`, { withCredentials: true });
      const categoryArray = Array.isArray(res.data.categories) ? res.data.categories : [];
      setCategories(categoryArray);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${baseUrl}/admin/update-category/${editId}`, { categoryName }, { withCredentials: true });
      } else {
        await axios.post(`${baseUrl}/admin/addcategory`, { categoryName }, { withCredentials: true });
      }
      setCategoryName('');
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error('Error saving category', err);
    }
    setLoading(false);
  };

  const handleEdit = (category) => {
    setCategoryName(category.categoryName);
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this category?')) {
      try {
        await axios.delete(`${baseUrl}/admin/delete-category/${id}`, { withCredentials: true });
        fetchCategories();
      } catch (err) {
        console.error('Error deleting category', err);
      }
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    fontFamily: "'Segoe UI', sans-serif",
    background: 'linear-gradient(to right, #fdf8f4, #f9f2ea)',
  };

  const headingStyle = {
    textAlign: 'center',
    color: '#4c3614',
    fontSize: '28px',
    marginBottom: '30px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 18px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    backgroundColor: editId ? '#ffc107' : 'rgba(123, 87, 32, 0.89)',
    color: '#fff',
    transition: 'background 0.3s ease',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '30px',
    fontSize: '15px',
  };

  const thStyle = {
    backgroundColor: 'rgba(123, 87, 32, 0.89)',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd',
    color: '#333',
  };

  const actionBtnStyle = {
    marginRight: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };
  const mainpage={
    background: "linear-gradient(to right, #fff8f8,rgba(148, 98, 11, 0.59))",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  marginTop:"-50px",
  height:"950px"
  }

  return (
    <>
      <AdminNav />
      <div style={mainpage}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>{editId ? ' Update Category' : ' Add New Category'}</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Saving...' : editId ? 'Update' : 'Add'}
          </button>
        </form>

        <h4 style={{ color: '#4e3c1c', marginBottom: '10px' }}> All Categories</h4>
        {categories.length === 0 ? (
          <p style={{ color: '#777' }}>No categories found.</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Category Name</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{cat.categoryName}</td>
                  <td style={tdStyle}>
                    <button
                      style={{ ...actionBtnStyle, backgroundColor: '#ffc107', color: '#000' }}
                      onClick={() => handleEdit(cat)}
                    >
                       Edit
                    </button>
                    <button
                      style={{ ...actionBtnStyle, backgroundColor: '#dc3545', color: '#fff' }}
                      onClick={() => handleDelete(cat._id)}
                    >
                       Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      </div>
    </>
  );
};

export default ManageCategory;
