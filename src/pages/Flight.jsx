import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import {flightApi} from '../api/flightApi'
import { airportApi } from '../api/airportApi'

const Flight = () => {
  const [toAirport, setToAirport ] = useState('')
  const [fromAirport, setFromAirport] = useState('')
  const [data, setData] =useState ([])
  const [isLoading, setIsLoading] = useState('')
  const [updateToAirport, setUpdateToAirport] = useState('')
  const [updateFromAirport, setUpdateFromAirport] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [airports, setAirports] = useState([])
  const [isAirport, setIsAirport] = useState(false)

  // get All Flight

  const getAirports = async () => {
     try {
        const res = await airportApi.getAll()
        setAirports(res.data.airports)
        setIsAirport(true)
     } catch (err) {
        console.log(err.response)
     }
  }

  useEffect(() => {
   getAirports()
  }, [])

  const getAll = async () => {
    try {
       const res = await flightApi.getAll()
       res.data.flights ? setData(res.data.flights.reverse()) : setData([])
       setIsLoading(true)
       console.log(res.data)
    } catch (err) {
         
    }
 }

 console.log(data)

 useEffect(() => {
    getAll()
 }, [])

//  create flight

const  createFlight = async (e) =>{
  e.preventDefault()

  const check = {
      toAirport: toAirport.trim().length === 0,
      fromAirport: fromAirport.length === 0,
  }

  if(check.toAirport || check.fromAirport){
     toast.error("Barcha ma`lumotlarni to`ldirish shart!")
     return
  }
  const params = {
     toAirport:String(toAirport),
     fromAirport:String(fromAirport)
  }
  try {
     await flightApi.create(params)
     toast.success("Reyslar Yaratildi!")
     setToAirport('')
     setFromAirport('')
     getAll()
  } catch (err) {
     console.log(err.response);
  }

  // delete Flight
  const deleteFlight = async (e, id) =>{
    try {
       await flightApi.delete(id)
       toast.success("Reyslar o`chirildi!")
       getAll()
    } catch (err) {
       console.log(err)
    }
 }

//  Update Flight
const updateFlight = async (e, id) => {
  e.preventDefault()
  const check = {
    fromAirport:updateFromAirport.trim().length === 0,
    toAirport:updateToAirport.length === 0
  }

  if(check.fromAirport || check.toAirport){
     toast.error("Barcha ma`lumotlarni to`ldirish shart!")
     return
  }
  const params = {
      fromAirport:updateFromAirport,
      toAirport:String(updateToAirport),
  }
  try {
     await flightApi.update(id, params)
     toast.success("Reyslar Yaratildi!")
     window.location.reload()
  } catch (err) {
     console.log(err);
  }
}
}

const filter = data.filter(item => item.toAirport.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.fromAirport.name.toString().includes(searchFilter))
  return (
    <div id='layoutSidenav_content'>
    <main>
       <div className='container-fluid px-4 mt-4'>
          <h3 className='fw-bold text-uppercase'>Flights</h3>

          <form className='row' onSubmit={createFlight}>
             <div className='col-lg-6 col-md-6 col-12 mb-3'>
               <select className="form-control" value={fromAirport} onChange={e=>setFromAirport(e.target.value)}>
                  <option value="">From Airport</option>
                  {isAirport && (
                     airports.map((item, index) => (
                        <option key={index} value={item._id}>{item.name}</option>
                     ))
                  )}
               </select>
             </div>
             <div className='col-lg-6 col-md-6 col-12 mb-3'>
             <select className="form-control" value={toAirport} onChange={e=>setToAirport(e.target.value)}>
                  <option value="">To Airport</option>
                  {isAirport && (
                     airports.map((item, index) => (
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
                <input type="text" className='form-control mb-3' placeholder='Search Flight ' value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
                {data.length > 0 ? (
                   <div className='table-responsive'>
                   {isLoading ? (
                         <table className='table table-striped table-bordered table-hover text-center'>
                            <thead>
                               <tr>
                                  <th>#</th>
                                  <th>From Flight</th>
                                  <th>To Airport</th>
                                  <th>Update</th>
                                  <th>Delete</th>
                               </tr>
                            </thead>
                            <tbody>
                               {searchFilter.length > 0 ? (
                                  <>
                                     {filter.map((item, index) => (
                                        <tr key={index}>
                                           <td>{index + 1}</td>
                                           <td>{item.fromAirport.name}</td>
                                           <td>{item.toAirport.name}</td>
                                           <td>
                                              <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                                 setUpdateFromAirport(item.fromAirport._id)
                                                 setUpdateToAirport(item.toAirport._id)
                                              }} >
                                                 <i className='fas fa-edit'></i>
                                              </button>

                                              <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                 <div className="modal-dialog">
                                                    <div className="modal-content">
                                                       <div className="modal-header">
                                                          <h5 className="modal-title"                   id="exampleModalLabel">Update Flight</h5>
                                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                                       </div>
                                                       <div className="modal-body">
                                                          <form>
                                                             <div className='mb-3'>
                                                                <input type="text" className='form-control' placeholder='From Flight' value={updateFromAirport} onChange={e => setUpdateFromAirport(e.target.value)} />
                                                             </div>
                                                             <div className='mb-3'>
                                                                <input type="text" className='form-control' placeholder='To Flight' value={updateToAirport} onChange={e => setUpdateToAirport(e.target.value)}  />
                                                             </div>
                                                             <div className='mb-3'>
                                                                <button className='btn btn-success d-block' onClick={e => {
                                                                   updateFlight(e, item._id)
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
                                                 deleteFlight(e, item._id)
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
                                        <td>{item.fromAirport.name}</td>
                                        <td>{item.toAirport.name}</td>
                                        <td>
                                           <button className='btn btn-warning text-white' data-bs-toggle="modal" data-bs-target={`#exampleModal${item._id}`} onClick={() => {
                                              setUpdateFromAirport(item.fromAirport._id)
                                              setUpdateToAirport(item.toAirport._id)
                                           }} >
                                              <i className='fas fa-edit'></i>
                                           </button>

                                           <div className="modal fade" id={`exampleModal${item._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                              <div className="modal-dialog">
                                                 <div className="modal-content">
                                                    <div className="modal-header">
                                                       <h5 className="modal-title" id="exampleModalLabel">Update Flight</h5>
                                                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                       <form>
                                                          <div className='mb-3'>
                                                             <input type="text" className='form-control' placeholder='From Flight' value={updateFromAirport} onChange={e => setUpdateFromAirport(e.target.value)} />
                                                          </div>
                                                          <div className='mb-3'>
                                                             <input type="text" className='form-control' placeholder='To Airport' value={updateToAirport} onChange={e => setUpdateToAirport(e.target.value)}  />
                                                          </div>
                                                          <div className='mb-3'>
                                                             <button className='btn btn-success d-block' onClick={(e) => {
                                                                updateFlight(e, item._id)
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
                                              deleteFlight(e, item._id)
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
                   <div className='alert alert-danger fw-bold text-center'>No data</div>
                )}
             </div>
          </div>
       </div>
    </main>
 </div>
   )
                    
                


     

}

export default Flight;
