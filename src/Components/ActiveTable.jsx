import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContainersRequest,
  deleteContainerRequest,
} from "../Redux_saga/Actions/Table_Action";


function ActiveTable() {
    const dispatch = useDispatch();
    const {containers, loading, error} = useSelector((state) => state.container);
    const [search, setSearch] = useState("");

    //fetch container on mount
    useEffect(() => {
        dispatch(fetchContainersRequest());
    },[dispatch]);

    //handle delete
    const handleDelete = (id) => {
        if(window.confirm("Delete this record?")){
            dispatch(deleteContainerRequest(id));
        }
    };

    //filter containers based on search
    const filteredContainers = containers.filter((item) => item.containerNo.toLowerCase().includes(search.toLowerCase()));
    
  return (
      <div className="container mt-5">
      <h2 className="mb-4">Active Containers</h2>

      {/* Search + Download */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">⬇ Download</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Table */}
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Container #</th>
            <th>Size</th>
            <th>Status</th>
            <th>Depot</th>
            <th>Location</th>
            <th>Pickup</th>
            <th>Depot In</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContainers.map((item) => (
            <tr key={item.id}>
              <td>{item.containerNo}</td>
              <td>{item.size}</td>
              <td>{item.status}</td>
              <td>{item.depot}</td>
              <td>{item.location}</td>
              <td>{item.pickup}</td>
              <td>{item.depotIn}</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredContainers.length === 0 && !loading && (
            <tr>
              <td colSpan="8" className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveTable;
