import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';
import axios from 'axios';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResources();
    fetchCategories();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    const matchesType = selectedType ? resource.resource_type === selectedType : true;
    const matchesSearch = searchTerm
      ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedType}
                label="Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={resource.category}
                    color="primary"
                    size="small"
                  />
                  <Chip
                    label={resource.resource_type}
                    color={resource.resource_type === 'free' ? 'success' : 'secondary'}
                    size="small"
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ mt: 2, cursor: 'pointer' }}
                  onClick={() => window.open(resource.link, '_blank')}
                >
                  Visit Resource
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ResourceList;
