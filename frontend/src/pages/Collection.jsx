import React, { useState, useEffect } from 'react'
import '../styles/Collection.css'

import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setcategory, setsort, setsubcategory } from '../services/Userslice';
import { useGetProductQuery } from '../services/Productapi';
import { filterAndSearchProducts } from '../services/Selector';

const Card = lazy(() => import('../components/Card'));
const Search = lazy(() => import('../components/Search'));

const Collection = () => {
  const dispatch = useDispatch();
  const sort = useSelector(state => state.user.sort);
  const selectedCategories = useSelector(state => state.user.category);
  const selectedSubcategories = useSelector(state => state.user.subcategory);

  const { data, isError, isLoading } = useGetProductQuery();
  const fs = useSelector(filterAndSearchProducts);

  // Handle checkbox state for categories
  const handleCategoryChange = (value) => {
    dispatch(setcategory({ value }));
  };

  // Handle checkbox state for subcategories
  const handleSubcategoryChange = (value) => {
    dispatch(setsubcategory({ value }));
  };

  return (
    <main className="collection">
      <Search />
      <section className='coll'>
        <aside>
          <p>FILTERS</p>
          <section className='category'>
            <h3>CATEGORIES</h3>
            <label>
              <input
                value="men"
                checked={selectedCategories.includes('men')}
                onChange={(e) => handleCategoryChange(e.target.value)}
                type="checkbox"
              />
              Men
            </label>
            <label>
              <input
                value="women"
                checked={selectedCategories.includes('women')}
                onChange={(e) => handleCategoryChange(e.target.value)}
                type="checkbox"
              />
              Women
            </label>
            <label>
              <input
                value="kids"
                checked={selectedCategories.includes('kids')}
                onChange={(e) => handleCategoryChange(e.target.value)}
                type="checkbox"
              />
              Kids
            </label>
          </section>

          <section className="subcategory">
            <h3>TYPES</h3>
            <label>
              <input
                value="topwear"
                checked={selectedSubcategories.includes('topwear')}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                type="checkbox"
              />
              Topwear
            </label>
            <label>
              <input
                value="bottomwear"
                checked={selectedSubcategories.includes('bottomwear')}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                type="checkbox"
              />
              Bottomwear
            </label>
            <label>
              <input
                value="winterwear"
                checked={selectedSubcategories.includes('winterwear')}
                onChange={(e) => handleSubcategoryChange(e.target.value)}
                type="checkbox"
              />
              Winterwear
            </label>
          </section>
        </aside>

        <section className='products'>
          <section className="titles">
            <h3><span>ALL</span> COLLECTION ---</h3>
            <select value={sort} onChange={(e) => dispatch(setsort({ value: e.target.value }))}>
              <option value="relevant">{"Sort by:Relevant"}</option>
              <option value="low-high">{"Low to High"}</option>
              <option value="high-low">{"High to Low"}</option>
            </select>
          </section>

          <section className="cards">
            {Array.isArray(fs) && fs.map((item) => (
              <Card key={item._id} name={item.name} price={item.price} img={item.image[0]} id={item._id} />
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Collection