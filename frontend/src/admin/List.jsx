import React from 'react'
import { useGetProductQuery, useRemoveproductMutation } from '../services/Productapi'

const List = () => {



const[Removeproduct,{data:remove}]=useRemoveproductMutation()
// console.log(remove)

   const{data,error,isLoading} =useGetProductQuery()




const handleremove = (id)=>{


  Removeproduct({_id:id})
}







  const page = { padding: 24 }
  const card = { background: '#fff', border: '1px solid #e8ebf2', borderRadius: 10, boxShadow: '0 2px 8px rgba(16,24,40,0.04)' }
  const header = { padding: '18px 24px', borderBottom: '1px solid #eef0f3', fontWeight: 700 }
  const tableWrap = { width: '100%', overflowX: 'auto' }
  const table = { width: '100%', borderCollapse: 'collapse' }
  const th = { textAlign: 'left', color: '#6b7280', fontWeight: 600, fontSize: 12, padding: '12px 24px' }
  const td = { padding: '16px 24px',textTransform:"capitalize" , borderTop: '1px solid #f0f2f6', verticalAlign: 'middle', fontSize: 14 }
  const thumb = { width: 44, height: 56, background: '#fafbff', border: '1px solid #e5e7eb', borderRadius: 8 }
  const action = { cursor: 'default', color: '#111', fontWeight: 600 }

  const rows = [
    { name: 'Men Round Neck Pure Cotton T-shirt', cat: 'Men', price: '$80' },
    { name: 'Men Tapered Fit Flat-Front Trousers', cat: 'Men', price: '$72' },
    { name: 'Women Round Neck Cotton Top', cat: 'Women', price: '$36' },
    { name: 'Women Round Neck Cotton Top', cat: 'Women', price: '$30' },
    { name: 'Men Tapered Fit Flat-Front Trousers', cat: 'Men', price: '$70' },
    { name: 'Men Slim Fit Relaxed Denim Jacket', cat: 'Men', price: '$86' },
    { name: 'Kid Tapered Slim Fit Trouser', cat: 'Kids', price: '$56' },
    { name: 'Boy Round Neck Pure Cotton T-shirt', cat: 'Kids', price: '$26' }
  ]

  return (
<div className="list" style={page}>
  <div style={card}>
    <div style={header}>All Products List</div>
    <div style={tableWrap}>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Image</th>
            <th style={th}>Name</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.message.map((r, i) => (
            <tr key={i}>
              <td style={td}>
                {r.image ? (
                  <img
                    src={r.image[0]}
                    alt={r.name}
                    style={{ ...thumb, objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      // fallback to your own cloudinary fallback image (replace with your Cloudinary account and valid image)
                      e.target.src = 'https://res.cloudinary.com/your-cloud-name/image/upload/v1699999999/default-product.jpg';
                    }}
                  />
                ) : (
                  <div style={thumb}></div>
                )}
              </td>
              <td style={td}>{r.name}</td>
              <td style={td}>{r.category}</td>
              <td style={td}>{r.price}</td>
              <td style={td}><span style={action}  onClick={()=>handleremove(r._id)}   >×</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  )
}

export default List