import React from 'react'
import { assets } from '../assets/admin_assets/assets'
// Removed 'Link' import as it's no longer needed inside MenuItem
import { NavLink, Outlet, useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import { setisauth } from '../services/Userslice'

const Adminlayout = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogout = () => {
    // Clear authentication token/data

dispatch(setisauth({login:false}))

    // Redirect to login page
    navigate('/login')
  }


  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
  }

  const sidebarStyle = {
    width: 240,
    borderRight: '1px solid #eef0f3',
    padding: 24,
    boxSizing: 'border-box'
  }

  const logoStyle = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }

  const menuStyle = { display: 'flex', flexDirection: 'column', gap: 12 }
  const menuItemBase = {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
    border: '1px solid #eef0f3', background: '#fff', color: '#111',
    textDecoration: 'none', // Important for the NavLink styling
    fontWeight: 500 // Apply text style here
  }

  const mainStyle = { flex: 1, padding: 24, boxSizing: 'border-box', background: '#f7f8fb' }
  const topBarStyle = { display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }
  const logoutBtnStyle = {
    padding: '10px 16px', borderRadius: 20, background: '#6b7280', color: '#fff', border: 'none', cursor: 'pointer'
  }

  // REVISED: MenuItem component now only handles presentation, not navigation
  const MenuItem = ({ icon, label }) => (
    <> {/* Fragment or a non-anchor tag if needed, but not a wrapping element here */}
      <img src={icon} alt="" style={{ width: 18, height: 18 }} />
      <span style={{ color: 'inherit' }}>{label}</span>
    </>
  )

  // Function to apply active styles when NavLink is active
  const getNavLinkStyle = ({ isActive }) => ({
    ...menuItemBase,
    background: isActive ? '#f5f7fb' : '#fff',
    borderColor: isActive ? '#d6dae3' : '#eef0f3',
    // Ensure text color is inherited but overridden for active state if necessary
    color: '#111' 
  });


  return (
<main className="adminlayout" style={containerStyle}>
  <aside style={sidebarStyle}>
    <div style={logoStyle}>
      <img src={assets.logo} alt="Forever Admin" style={{ height: 56, width: 'auto' }} />
    </div>

    <div style={menuStyle}>
    
    {/* FIX: Use NavLink's styling function to handle active state */}
    <NavLink to="/admin/add" style={getNavLinkStyle}>
      <MenuItem icon={assets.add_icon} label="Add Items" />
    </NavLink>
    
    <NavLink to="/admin/list" style={getNavLinkStyle}>
      <MenuItem icon={assets.add_icon} label="List Items" />
    </NavLink>
    
    <NavLink to="/admin/ol" style={getNavLinkStyle}>
      <MenuItem icon={assets.order_icon} label="Orders" />
    </NavLink>

    </div>
  </aside>

  <section style={mainStyle}>
    <div style={topBarStyle}>
      <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
    </div>
    <Outlet />
  </section>
</main>
  )
}

export default Adminlayout