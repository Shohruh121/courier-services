import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../handlers/isAuthentification'

const Sidebar = () => {
   return (
      <div id="layoutSidenav_nav">
         <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
               <div className="nav">
                  <div className="sb-sidenav-menu-heading text-warning">Interface of shipping</div>
                  <Link to='/' className="nav-link text-info">
                     <div className="sb-nav-link-icon text-info"><i className="fas fa-home"></i></div>
                     Home
                  </Link>
                  <Link to='/orders' className="nav-link text-success">
                     <div className="sb-nav-link-icon text-success"><i className="fas fa-shopping-cart"></i></div>
                     Orders
                  </Link>
                  <Link to='/clients' className="nav-link text-success">
                     <div className="sb-nav-link-icon text-success"><i className="fas fa-users"></i></div>
                     CLients
                  </Link>
                  <Link to='/airports' className="nav-link text-primary">
                     <div className="sb-nav-link-icon text-primary"><i className="fas fa-plane"></i></div>
                     Airports
                  </Link>
                  <Link to='/flights' className="nav-link text-primary">
                     <div className="sb-nav-link-icon text-primary"><i className="fas fa-helicopter"></i></div>
                     Flights
                  </Link>
                  <Link to='/warehouse' className="nav-link text-warning   ">
                     <div className="sb-nav-link-icon text-warning"><i className="fas fa-warehouse"></i></div>
                     Warehouses
                  </Link>
                  <Link to='/admin' className="nav-link text-success">
                     <div className="sb-nav-link-icon text-success"><i className="fas fa-user-cog"></i></div>
                     Admin
                  </Link>
                  <a href='/' onClick={logout} className="nav-link text-danger">
                     <div className="sb-nav-link-icon text-danger"><i className="fas fa-sign-out-alt text-danger"></i></div>
                     Logout
                  </a>
               </div>
            </div>
         </nav>
      </div>
   )
}

export default Sidebar