import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContainerRequest,
  editContainerRequest,
  fetchContainersRequest,
  viewContainerRequest,
  
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


   const handleView = (item) => {
     dispatch(viewContainerRequest(item.id));
    toast.info(`Viewing container: ${item.containerNo}`);
  };

  const handleEdit = (item) => {
     const updatedData = { ...item, status: "UPDATED" }; // sample update
    dispatch(editContainerRequest(item.id, updatedData));
    toast.warning(`Editing container: ${item.containerNo}`);
  };

   const handleCreate = () => {
    const newData = {
      containerNo: "NEW12345",
      productType: "20FT",
      status: "ACTIVE",
      currentDepo: "CHENNAI",
    };
    dispatch(createContainerRequest(newData));
    toast.success("New container created!");
  };

  // Search across all fields
  const filteredContainers =
    search.trim() === ""
      ? containers
      : containers.filter((item) =>
          Object.values(item).some((val) =>
            String(val || "")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Active Containers</h2>

      {/* Search + Download */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={handleCreate}>
          ➕ Create
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-25"
          style={{ marginLeft: "auto" }}
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
            <th>Shipp/Cons</th>
            <th>Pickup</th>
            <th>Depot In</th>
            <th>VSL/VOY</th>
            <th>SOB</th>
            <th>ATA</th>
            <th>Tarewt</th>
            <th>Maxwt</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContainers.length > 0 ? (
            filteredContainers.map((item) => (
              <tr key={item.id}>
                <td>{item.containerNo}</td>
                <td>{item.productType}</td>
                <td>{item.status}</td>
                <td>{item.currentDepo || "-"}</td>
                <td>{item.currentLocation || "-"}</td>
                <td>{item.shipperConsignee || "-"}</td>
                <td>{item.pickUpDate || "-"}</td>
                <td>{item.depotInDate || "-"}</td>
                <td>{item.vesselVoyage|| "-"}</td>
                <td>{item.sobDate || "-"}</td>
                <td>{item.ataDate || "-"}</td>
                <td>{item.tareWeight || "-"}</td>
                <td>{item.maxGrossWeight || "-"}</td>
                <td>{item.containerType|| "-"}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="15" className="text-center">
                  No records found
                </td>
              </tr>
            )
          )}
        </tbody>

      </table>
    </div>
  );
}

export default ActiveTable;

