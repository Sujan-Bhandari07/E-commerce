import { createSelector } from '@reduxjs/toolkit';
import { productApi } from './Productapi';
import { useSelector } from 'react-redux';

export const latestcollection = createSelector(
  [productApi.endpoints.getProduct.select(undefined)],
  (result = {}) => {
    // Check if data exists and has the correct structure
    if (!result.data || !result.data.message) {
      return [];
    }
    
    // Create a copy of the array before sorting to avoid mutation
    const messageData = [...result.data.message];
    const sortedproduct = messageData.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Take the first 12 items
    const latest = sortedproduct.slice(0, 12);
    return latest;
  }
);

export const bestsellercollection = createSelector(
  [productApi.endpoints.getProduct.select()],
  (result ) => {
    // Check if data exists and has the correct structure
    if (!result.data || !result.data.message) {
      return [];
    }
    
    // Filter products marked as bestsellers
    const bestsellers = result.data.message.filter(item => item.isbestseller === true);
    
    // Take up to 6 bestseller items
    return bestsellers.slice(0, 6);
  }
);




export const filterAndSearchProducts = createSelector(
  [(state) => productApi.endpoints.getProduct.select(undefined)(state), 
   (state) => state.user.category,
   (state) => state.user.subcategory,
   (state) => state.user.sort,
   (state) => state.user.search],
  (data, category, subcategory, sort, search) => {
    if (!data || !data.data || !data.data.message) {
      return [];
    }

    let filtprod = [...data.data.message];

    // Filter by search term if provided
    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      filtprod = filtprod.filter(item => 
        item.name?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.category?.toLowerCase().includes(searchLower) ||
        item.subcategory?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category if provided
    if (category && category.length > 0) {
      filtprod = filtprod.filter((item) => category.includes(item.category));
    }

    // Filter by subcategory if provided
    if (subcategory && subcategory.length > 0) {
      filtprod = filtprod.filter((item) => subcategory.includes(item.subcategory));
    }

    // Sort by price if sort option is provided
    if (sort) {
      if (sort === "high-low") {
        filtprod = filtprod.sort((a, b) => b.price - a.price);
      } else if (sort === "low-high") {
        filtprod = filtprod.sort((a, b) => a.price - b.price);
      }
    }

    return filtprod;
  }
);



