

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
import { useAddProductMutation } from '../services/Productapi'
import { useDispatch } from 'react-redux'

const Add = () => {
  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  
  // Form state
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("men")
  const [subcategory, setSubcategory] = useState("topwear")
  const [isbestseller, setIsBestseller] = useState(false)
  const [size, setSize] = useState([])
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [addProduct, { isLoading }] = useAddProductMutation()

  const handleSize = (e) => {
    const value = e.target.value
    setSize((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    )
  }

  const resetForm = () => {
    setName("")
    setPrice("")
    setDesc("")
    setCategory("men")
    setSubcategory("topwear")
    setSize([])
    setIsBestseller(false)
    setImage1(null)
    setImage2(null)
    setImage3(null)
    setImage4(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append("name", name)
    form.append("price", price)
    form.append("desc", desc)
    form.append("category", category)
    form.append("subcategory", subcategory)
    form.append("isbestseller", isbestseller.toString())
    form.append("size", JSON.stringify(size))

    if (image1) form.append("image1", image1)
    if (image2) form.append("image2", image2)
    if (image3) form.append("image3", image3)
    if (image4) form.append("image4", image4)

    try {
      await addProduct(form).unwrap()
      resetForm()
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  // Styles
  const container = { background: '#fff' }
  const sectionTitle = { fontWeight: 600, marginBottom: 12 }
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: 12, marginBottom: 20 }
  const uploadTile = {
    width: 100, height: 80, border: '1px dashed #cfd5e1', borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafbff', 
    cursor: 'pointer', position: 'relative', overflow: 'hidden'
  }
  const uploadInput = { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }
  const input = {
    width: '100%', padding: '12px 14px', border: '1px solid #e5e7eb', borderRadius: 8, outline: 'none'
  }
  const row = { display: 'flex', gap: 16, marginTop: 16 }
  const select = { ...input, width: 180 }
  const smallInput = { ...input, width: 120 }
  const sizesRow = { display: 'flex', gap: 12, marginTop: 12 }
  const sizeBtn = (active) => ({
    padding: '8px 12px', borderRadius: 6, border: `1px solid ${active ? '#111827' : '#e5e7eb'}`,
    background: active ? '#111827' : '#f3f4f6', color: active ? '#fff' : '#111827', cursor: 'pointer'
  })
  const addBtn = { 
    marginTop: 24, background: '#000', color: '#fff', border: 'none', 
    padding: '12px 24px', borderRadius: 2, cursor: 'pointer',
    opacity: isLoading ? 0.6 : 1
  }

  return (
    <form className="add" style={container} onSubmit={handleSubmit} encType="multipart/form-data">
      <div style={{ padding: 24 }}>
        <div style={sectionTitle}>Upload Image</div>
        <div style={grid}>
          {[
            { image: image1, setImage: setImage1 },
            { image: image2, setImage: setImage2 },
            { image: image3, setImage: setImage3 },
            { image: image4, setImage: setImage4 }
          ].map(({ image, setImage }, index) => (
            <div key={index} style={uploadTile}>
              <img 
                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                alt="upload" 
                style={{ width: 100, opacity: 0.7, pointerEvents: 'none' }} 
              />
              <input 
                onChange={(e) => setImage(e.target.files[0])} 
                type="file" 
                accept="image/*" 
                style={uploadInput} 
              />
            </div>
          ))}
        </div>

        <div style={sectionTitle}>Product name</div>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={input} 
          placeholder="Type here"
          required
        />

        <div style={{ ...sectionTitle, marginTop: 16 }}>Product description</div>
        <textarea 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          style={{ ...input, minHeight: 100, resize: 'vertical' }} 
          placeholder="Write content here"
          required
        />

        <div style={{ ...row, alignItems: 'center' }}>
          <div>
            <div style={sectionTitle}>Product category</div>
            <select style={select} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div>
            <div style={sectionTitle}>Sub category</div>
            <select style={select} value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <div style={sectionTitle}>Product Price</div>
            <input 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              style={smallInput} 
              placeholder="Enter price"
              type="number"
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={sectionTitle}>Product Sizes</div>
          <div style={sizesRow}>
            {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
              <button
                onClick={handleSize}
                value={s}
                key={s}
                type="button"
                style={sizeBtn(size.includes(s))}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={isbestseller} 
            onChange={() => setIsBestseller(!isbestseller)} 
          />
          <span>Add to bestseller</span>
        </label>

        <button style={addBtn} disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "ADD"}
        </button>
      </div>
    </form>
  )
}

export default Add
