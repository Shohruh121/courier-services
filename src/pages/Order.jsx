import React, {useEffect, useState} from 'react'
import { orderApi } from '../api/orderApi'
import { toast } from 'react-toastify'
import {clientApi} from '../api/clientApi'
import { warehouseApi } from '../api/warehouseApi'



const Order = () => {
   const [barcode, setBarcode] = useState('')
   const [weight, setWeight] = useState('')
   const [status, setStatus] = useState('')
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(false)
   const [updateBarcode, setUpdateBarcode] = useState('')
   const [updateWeight, setUpdateWeight] = useState('')
   const [updateStatus, setUpdateStatus] = useState('')
   const [searchFilter, setSearchFilter] = useState('')
   const [client, setClient] = useState('')
   const [clients, setClients] = useState('')
   const [isClients, setIsClients] = useState(false)
   const [warehouse, setWarehouse] = useState('')
   const [warehouses, setWarehouses] = useState('')
   const [isWarehouses, setIsWarehouses] = useState('')

   const getClients = async () => {
      try {
         const res = await clientApi.getAll()
         setClients(res.data.clients)
         setIsClients(true)
      } catch (err) {
         console.log(err.response)
      }
   }
 
   useEffect(() => {
    getClients()
   }, [])

   const getWarehouses = async () => {
      try {
         const res = await warehouseApi.getAll()
         setWarehouses(res.data.warehouses)
         setIsWarehouses(true)
      } catch (err) {
         console.log(err.response)
      }
   }
 
   useEffect(() => {
    getWarehouses()
   }, [])

   const getAll = async () => {
      try {
         const res = await orderApi.getAll()
         res.data.order ? setData(res.data.order.reverse()) : setData([])
         setIsLoading(true)
      } catch (err) {
         setData([])
      }
   }

   
 console.log(data)

   useEffect(() => {
      getAll()
   }, [])

   const createOrder = async (e) => {
      e.preventDefault()
      const check = {
         barcode: barcode.trim().length === 0,
         weight: weight.length === 0
        
      }

      if (check.barcode || check.weight) {
         toast.error("Barcha ma'lumotlar to'ldirishi shart")
         return
      }

      const params = {
         barcode: barcode,
         weight: String(weight)
      }
      try {
         await orderApi.create(params)
         setBarcode('')
         setWeight('')
         getAll()
      } catch (err) {
         if(err.response.status === 400) {
            toast.error("Bunday mijoz oldin ro'yxatdan o'tkazilgan")
         } else {
            toast.error("Xatolik")
         }
      }
   }

   const deleteOrder = async (e, id) => {
      try {
         await orderApi.delete(id)
         toast.success("Mijoz o'chirildi")
         getAll()
      } catch (err) {
         console.log(err);
      }
   }

   const updateOrder = async (e, id) => {
      e.preventDefault()
      const check = {
         barcode: updateBarcode.trim().length === 0,
         weight: updateWeight.length === 0
      }

      if (check.barcode || check.weight) {
         toast.error("Barcha ma'lumotlar to'ldirishi shart")
         return
      }
      const params = {
         barcode: updateBarcode,
         weight: String(updateWeight)
      }
      try {
         await orderApi.update(id, params)
         toast.success("Mijoz tahrirlandi")
         window.location.reload()
      } catch (err) {
         if(err.response.status === 400) {
            toast.error("Bunday mijoz oldin ro'yxatdan o'tkazilgan")
         } else {
            toast.error("Xatolik")
         }
      }
   }

   const filter = data.filter(item => item.barcode.toLowerCase().includes(searchFilter.toLowerCase()) || item.weight.toString().includes(searchFilter))
   return (
      <div id='layoutSidenav_content'>
         <main>
            <div className='container-fluid px-4 mt-4'>
                  <h3 className='fw-bold text-uppercase ml-5'>Orders</h3>
               
               

               <form className='row' onSubmit={createOrder}>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <input type="order" className='form-control' placeholder='Order barcode' value={barcode} onChange={e => setBarcode(e.target.value)} />
                  </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <input type="text" className='form-control' placeholder='Weight' value={weight} onChange={e => setWeight(e.target.value)}  />
                  </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <input type="order" className='form-control' placeholder='Status' value={status} onChange={e => setStatus(e.target.value)} />
                     </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <select className="form-control" value={client} onChange={e=>setClient(e.target.value)}>
                     <option value="">Client Id</option>
                  {isClients && (
                     clients.map((item, index) => (
                        <option key={index} value={item._id}>{item.number}</option>
                     ))
                  )}
                     </select>
                  </div>
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <select className="form-control" value={warehouse} onChange={e=>setWarehouse(e.target.value)}>
                        <option value="">WareHouse Id</option>
                           {isWarehouses && (
                              warehouses.map((item, index) => (
                                 <option key={index} value={item._id}>{item.name}</option>
                              ))
                           )}
                        </select>
                        
                  </div>
               
                  <div className='col-lg-6 col-md-6 col-12 mb-3'>
                     <button className='btn btn-success'>
                        <i className='fas fa-plus'></i> Create
                     </button>
                  </div>
               </form>

               <div className='row'>
                  <div className="col-12">
                     <input type="text" className='form-control mb-3' placeholder='search order barcode or weight' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
                     {data.length > 0 ? (
                        <div className='table-responsive'>
                        {isLoading ? (
                              <table className='table table-striped table-bordered table-hover text-center'>
                                 <thead>
                                    <tr>
                                       <td>#</td>
                                       <td>Barcode</td>
                                       <td>Weight</td>
                                       <td>ClientId</td>
                                       <td>WareHouseId</td>
                                       <td>Update</td>
                                       <td>Delete</td>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {searchFilter.length > 0 ? (
                                       <>
                                          {filter.map((item, index) => (
                                             <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.barcode}</td>
                                                <td>{item.weight}</td>
                                                <td>{item.client.name}</td>
                                                <td>
                                                   <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                      setUpdateBarcode(item.barcode)
                                                      setUpdateWeight(item.weight)
                                                      setUpdateWeight(item.client._id)
                                                   }} >
                                                      <i className='fas fa-edit'></i>
                                                   </button>

                                                   <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                      <div className="modal-dialog">
                                                         <div className="modal-content">
                                                            <div className="modal-header">
                                                               <h5 className="modal-title" id="exampleModalLabel">Update Orders</h5>
                                                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                               <form>
                                                                  <div className='mb-3'>
                                                                     <input type="weight" className='form-control' placeholder='order weight' value={updateWeight} onChange={e => setUpdateWeight(e.target.value)} />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <input type="text" className='form-control' placeholder='barcode' value={updateBarcode} onChange={e => setUpdateBarcode(e.target.value)}  />
                                                                  </div>
                                                                  <div className='mb-3'>
                                                                     <button className='btn btn-success d-block' onClick={(e) => {
                                                                        updateOrder(e, item._id)
                                                                     }}>
                                                                        <i className='fas fa-save'></i> Save
                                                                     </button>
                                                                  </div>
                                                               </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            </div>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </td>
                                                <td>
                                                   <button className='btn btn-danger mr-2' onClick={(e) => {
                                                      deleteOrder(e, item._id)
                                                   }}>
                                                      <i className='fas fa-trash'></i>
                                                   </button>
                                                </td>
                                             </tr>
                                          ))}  
                                       </> 
                                    ): (
                                       <>
                                          {data.map((item, index) => (
                                          <tr key={index}>
                                             <td>{index + 1}</td>
                                             <td>{item.barcode}</td>
                                             <td>{item.weight}</td>
                                             <td>{item.client}</td>
                                             <td>{item.warehouse}</td>
                                             <td>
                                                <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                   setUpdateBarcode(item.barcode)
                                                   setUpdateWeight(item.weight)
                                                   setUpdateClient(item.client._id)
                                                   setUpdateClient(item.warehouse._id)
                                                }} >
                                                   <i className='fas fa-edit'></i>
                                                </button>

                                                <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                   <div className="modal-dialog">
                                                      <div className="modal-content">
                                                         <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Orders</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                         </div>
                                                         <div className="modal-body">
                                                            <form>
                                                               <div className='mb-3'>
                                                                  <input type="weight" className='form-control' placeholder='order weight' value={updateWeight} onChange={e => setUpdateWeight(e.target.value)} />
                                                               </div>
                                                               <div className='mb-3'>
                                                                  <input type="text" className='form-control' placeholder='barcode' value={updateBarcode} onChange={e => setUpdateBarcode(e.target.value)}  />
                                                               </div>
                                                               <div className='mb-3'>
                                                                  <button className='btn btn-success d-block' onClick={(e) => {
                                                                     updateOrder(e, item._id)
                                                                  }}>
                                                                     <i className='fas fa-save'></i> Save
                                                                  </button>
                                                               </div>
                                                            </form>
                                                         </div>
                                                         <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                         </div>
                                                      </div>
                                                   </div>
                                                </div>
                                             </td>
                                             <td>
                                                <button className='btn btn-danger mr-2' onClick={(e) => {
                                                   deleteOrder(e, item._id)
                                                }}>
                                                   <i className='fas fa-trash'></i>
                                                </button>
                                             </td>
                                          </tr>
                                       ))} 
                                       </> 
                                    )}
                                 </tbody>
                              </table>
                           ): (
                              <div>Loading...</div>
                           )}
                        </div>
                     ): (
                        <div className='alert alert-danger'>No data</div>
                     )}
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}

export default Order