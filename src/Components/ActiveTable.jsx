import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContainersRequest,
  deleteContainerRequest,
} from "../Redux_saga/Actions/Table_Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActiveTable() {
  const dispatch = useDispatch();
  const { containers, loading, error } = useSelector(
    (state) => state.container
  );
  const [search, setSearch] = useState("");
useEffect(() => {
  const token = localStorage.getItem("authToken");
  console.log("JWT Token:", token); // Check token
  dispatch(fetchContainersRequest());
}, [dispatch]);


  // const handleDelete = (id) => {
  //   if (window.confirm("Delete this record?")) {
  //     dispatch(deleteContainerRequest(id));
  //     toast.success("Record deleted successfully!");
  //   }
  // };

   const handleView = (item) => {
     dispatch(viewContainerRequest(item.id));
    toast.info(`Viewing container: ${item.containerNo}`);
  };

  const handleEdit = (item) => {
    toast.warning(`Editing container: ${item.containerNo}`);
  };

  const filteredContainers = search?containers.filter((item) =>
    item.containerNo.toLowerCase().includes(search.toLowerCase())
  ): containers;

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
      <td>{item.productType}</td>
      <td>{item.status}</td>
      <td>{item.currentDepo || "-"}</td>
      <td>{item.currentLocation || "-"}</td>
      <td>{item.pickUpDate || "-"}</td>
      <td>{item.depotInDate || "-"}</td>
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
  {search && filteredContainers.length === 0 && !loading && (
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

