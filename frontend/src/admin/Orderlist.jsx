import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { useGetallcartQuery, useManagecartMutation } from '../services/Productapi'

const Orderlist = () => {
  const { data, refetch, isLoading } = useGetallcartQuery() 
  const [Managecart, { data: managedata, isError }] = useManagecartMutation()
  // console.log(data,managedata)
  
  React.useEffect(() => {
      if (managedata) {
          // console.log("Order status updated successfully:", managedata);
          refetch();
      }
      if (isError) {
          // console.error("Error updating order status.");
      }
  }, [managedata, isError, refetch]);

 

  // --- Style Definitions (Unchanged) ---
  const page = { padding: 24 }
  const title = { fontWeight: 700, marginBottom: 16 }
  const card = { border: '1px solid #e8ebf2', borderRadius: 10, padding: 20, background: '#fff', boxShadow: '0 2px 8px rgba(16,24,40,0.04)' }
  const row = { display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 16, alignItems: 'start' }
  const iconBox = { width: 48, height: 48, display: 'grid', placeItems: 'center', borderRadius: 10, background: '#fafbff', border: '1px solid #e5e7eb' }
  const section = { color: '#111', fontSize: 14, lineHeight: 1.6 }
  const faint = { color: '#6b7280' }
  const amount = { fontWeight: 800, fontSize: 18 }
  const select = { padding: '10px 12px', borderRadius: 8, border: '1px solid #d6dae3', background: '#fff', outline: 'none' }
  const list = { display: 'grid', gap: 16 }
  const hrBox = { marginTop: 16 }
  const hr = { height: 1, background: '#eef0f3', border: 0 }
  const optionStyles = { textTransform: 'capitalize' }
  // -------------------------------------

  if (isLoading) {
      return <div style={page}>Loading Orders...</div>;
  }

  const apiOrders = data?.message || []

  // console.log("Raw API Orders Data:", apiOrders);

  if (apiOrders.length === 0) {
      return <div style={page}>No orders found.</div>;
  }
  
  const orders = apiOrders.map(order => {
    const info = order.info || {};
    const product = order.product || {};
    const createdAtDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A';

    // Group items logic (Unchanged, using robust logic)
    const itemMap = {};
    if (product.items && product.items.length > 0) {
        product.items.forEach(item => {
            const uniqueKey = item._id + (item.size || ''); 
            if (!itemMap[uniqueKey]) {
                itemMap[uniqueKey] = {
                    name: item.name || `Product ID: ${item._id.substring(0, 8)}...`,
                    size: item.size || 'N/A',
                    quantity: 0
                };
            }
            itemMap[uniqueKey].quantity += 1;
        });
    }

    const items = Object.values(itemMap).map(item => {
        const productName = item.name;
        const productSize = item.size !== 'N/A' ? `(${item.size})` : '';
        return `${productName} × ${item.quantity} ${productSize}`.trim();
    });
    
    if (items.length === 0) {
        items.push('No product items in cart data.'); 
    }

    const uniqueItemCount = Object.keys(itemMap).length || (product.items?.length > 0 ? product.items.length : 0);

    // Address Formatting
    const addressLines = [
        info.street,
        `${info.city || ''}, ${info.state || ''}, ${info.zipcode || ''}`.trim().replace(/^,\s|, ,|,\s{2,}/g, '').replace(/,+$/, '').trim(),
        info.country
    ].filter(line => line && line.trim());

    // **CRITICAL STATUS ASSIGNMENT**
    const orderStatus = product.orderstatus?.toLowerCase() || 'order placed';
    
    return {
      productid: product._id,
      userid: order.userid || order._id,
      items: items,
      name: `${info.firstname?.toUpperCase() || ''} ${info.lastname?.toUpperCase() || ''}`,
      addressLines: addressLines,
      phone: info.phone,
      count: uniqueItemCount, 
      method: product.method?.toUpperCase() || 'N/A',
      payment: 'Done', 
      date: createdAtDate,
      total: `$${(product.totalPrice || 0) + (product.ship || 0)}`, 
      // Use the guaranteed status here
      status: orderStatus
    };
  });

  return (
    <div className="ol" style={page}>
      <div style={title}>Order Page</div>
      <div style={list}>
        {orders.map((o, i) => (
          <div key={o.productid || i} style={card}> 
            <div style={row}>
              <div style={iconBox}>
                <img src={assets.parcel_icon} alt="parcel" style={{ width: 24 }} />
              </div>
              <div style={section}>
                {o.items.map((it, idx) => (
                  <div key={idx}>{it}</div>
                ))}
                <div style={hrBox}><hr style={hr} /></div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 600 }}>{o.name}</div>
                  {o.addressLines.map((line, index) => (
                      <div key={index} style={faint}>{line}</div>
                  ))}
                  <div style={faint}>{o.phone}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...section }}>
                  <div>Items : {o.count}</div>
                  <div>Method : {o.method}</div>
                  <div>Payment : {o.payment}</div>
                  <div>Date : {o.date}</div>
                </div>
                <div style={{ marginTop: 8, ...amount }}>{o.total}</div>
                <div style={{ marginTop: 10 }}>
                  <select 
                    style={select} 
                    defaultValue={o.status} 
                    onChange={(e)=>(Managecart({data:{orderstatus:e.target.value,userid:o.userid}}))}

                  >
                    <option value="order placed" style={optionStyles}>Order Placed</option>
                    <option value="packaging" style={optionStyles}>Packaging</option>
                    <option value="out for delivery" style={optionStyles}>Out for delivery</option>
                    <option value="delivered" style={optionStyles}>Delivered</option>
                    <option value="shipped" style={optionStyles}>Shipped</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orderlist