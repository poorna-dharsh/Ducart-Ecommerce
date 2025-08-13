import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import $ from "jquery"; // Import jQuery
import "datatables.net-dt/css/dataTables.dataTables.min.css"; // Import DataTables styles
import "datatables.net";

import Sidebar from "../../Components/Sidebar";
import HeroSection from "../../Components/HeroSection";
import { Link } from "react-router-dom";

import {
  deleteBrand,
  getBrand,
} from "../../Redux/ActionCreators/BrandActionCreators";
export default function AdminBrand() {
  let [data, setData] = useState([]);

  let dispatch = useDispatch();
  let BrandStateData = useSelector((state) => state.BrandStateData);

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      dispatch(deleteBrand({ id: id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getBrand());

    if (BrandStateData.length) setData(BrandStateData);
    else setData([]);

    let time = setTimeout(() => {
      $("#DataTable").DataTable();
    }, 500);
    return time;
  }
  useEffect(() => {
    let time = getAPIData();
    return () => clearTimeout(time);
  }, [BrandStateData.length]);

  return (
    <>
      <HeroSection title="Admin" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">
              Brand{" "}
              <Link to="/admin/brand/create">
                {" "}
                <i className="fa fa-plus text-light float-end"></i>
              </Link>
            </h5>
            <table
              className="table table-bordered table-hover table-striped"
              id="DataTable"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Pic</th>
                  <th>Active</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const BASE_URL =
                    process.env.REACT_APP_SERVER || "http://localhost:8080";
                  const imageUrl = item.pic.startsWith("/")
                    ? `${BASE_URL}${item.pic}`
                    : item.pic;
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <Link to={imageUrl} target="_blank" rel="noreferrer">
                          <img
                            src={imageUrl}
                            height={50}
                            width={80}
                            className="rounded"
                            alt="Brand Image"
                          />
                        </Link>
                      </td>
                      <td>{item.active ? "Yes" : "No"}</td>
                      <td>
                        <Link
                          to={`/admin/brand/update/${item.id}`}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
// import React, { useEffect, useState } from 'react'

// import $ from 'jquery';  // Import jQuery
// import 'datatables.net-dt/css/dataTables.dataTables.min.css'; // Import DataTables styles
// import 'datatables.net';

// import Sidebar from '../../Components/Sidebar'
// import HeroSection from '../../Components/HeroSection'
// import { Link } from 'react-router-dom'

// export default function AdminBrand() {
//   let [data, setData] = useState([])

//   async function deleteRecord(id) {
//     if (window.confirm("Are You Sure to Delete that Item : ")) {
//       let response = await fetch(`${process.env.REACT_APP_SERVER}/brand/${id}`, {
//         method: "DELETE",
//         headers: {
//           "content-type": "application/json"
//         }
//       })
//       response = await response.json()
//       getAPIData()
//     }
//   }

//   async function getAPIData() {
//     let response = await fetch(`${process.env.REACT_APP_SERVER}/brand`, {
//       method: "GET",
//       headers: {
//         "content-type": "application/json"
//       }
//     })
//     response = await response.json()
//     if (response)
//       setData(response)
//     else
//       alert("Something Went Wrong")

//     let time = setTimeout(() => {
//       $('#DataTable').DataTable()
//     }, 500);
//     return time
//   }
//   useEffect(() => {
//     let time = getAPIData()
//     return () => clearTimeout(time)
//   }, [])

//   return (
//     <>
//       <HeroSection title="Admin" />
//       <div className="container-fluid">
//         <div className='row'>
//           <div className="col-md-3">
//             <Sidebar />
//           </div>
//           <div className="col-md-9">
//             <h5 className='bg-primary text-center text-light p-2'>Brand <Link to="/admin/brand/create"> <i className='fa fa-plus text-light float-end'></i></Link></h5>
//             <table className='table table-bordered table-hover table-striped' id='DataTable'>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Pic</th>
//                   <th>Active</th>
//                   <th></th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   data.map((item, index) => {
//                     return <tr key={index}>
//                       <td>{item.id}</td>
//                       <td>{item.name}</td>
//                       <td>
//                         <Link to={`${process.env.REACT_APP_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
//                           <img src={`${process.env.REACT_APP_SERVER}${item.pic}`} height={50} width={80} className='rounded' alt="Brand Image" />
//                         </Link>
//                       </td>
//                       <td>{item.active ? "Yes" : "No"}</td>
//                       <td><Link to={`/admin/brand/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link></td>
//                       <td><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
//                     </tr>
//                   })
//                 }
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }
