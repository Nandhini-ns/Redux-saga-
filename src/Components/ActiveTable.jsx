import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createContainerRequest,
  editContainerRequest,
  fetchContainersRequest,
  viewContainerRequest,
  
} from "../Redux_saga/Actions/Table_Action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUser, faUserCircle, faGear, faBell, faRightFromBracket, faPlusCircle, faDownload, } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

function ActiveTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { containers, loading, error } = useSelector(
    (state) => state.container
  );
  const [search, setSearch] = useState("");
useEffect(() => {
  const token = localStorage.getItem("authToken");
  console.log("JWT Token:", token); // Check token
   if (!token) {
      navigate("/loginform", { replace: true });
      return;
    }
  dispatch(fetchContainersRequest());
}, [dispatch,navigate]);

 const [dropdownOpen, setDropdownOpen] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("authToken");
   sessionStorage.clear();
  window.location.href = "/loginform"; 
};

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
    <div className="container-fluid p-3" style={{ background: "#f9f9f9" }}>
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded mb-3">
       <h4 className="m-0">Active Containers</h4>
  

  {/* User profile dropdown */}
  <div className="position-relative">
    <button
      className="btn btn-light d-flex align-items-center"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <FontAwesomeIcon icon={faUserCircle} className="text-primary fs-3" />
       <span>User ID</span>
       <i className="ms-2">▼</i>
    </button>

    {dropdownOpen && (
      <div
        className="position-absolute bg-white border rounded shadow mt-2"
        style={{ right: 0, zIndex: 10, minWidth: "180px" }}
      >
        <button className="dropdown-item d-flex align-items-center">
          <FontAwesomeIcon icon={faUser} className="text-primary fs-3" />
        </button>
        <button className="dropdown-item d-flex align-items-center">
          <FontAwesomeIcon icon={faGear} className="text-secondary fs-3" />
        </button>
        <button className="dropdown-item d-flex align-items-center">
          <FontAwesomeIcon icon={faBell} className="text-secondary fs-3" /> Notifications
        </button>
        <hr className="m-1" />
        <button
          className="dropdown-item text-danger d-flex align-items-center"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="me-2" /> Logout
        </button>
      </div>
    )}
  </div>
</div>


      {/* Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-success" onClick={handleCreate}>
          <FontAwesomeIcon icon={faPlusCircle} /> New Container
        </button>

        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary">
            <FontAwesomeIcon icon={faDownload} /> Download
          </button>
        </div>
      </div>

      {/* Table */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="table-responsive">
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
                  <td>
                    <span
                      className={`badge ${
                        item.status === "PICKED"
                          ? "bg-primary"
                          : item.status === "AVAILABLE"
                          ? "bg-success"
                          : item.status === "IN_TRANSIT"
                          ? "bg-danger"
                          : "bg-info"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{item.currentDepo || "-"}</td>
                  <td>{item.currentLocation || "-"}</td>
                  <td>{item.shipperConsignee || "-"}</td>
                  <td>{item.pickUpDate || "-"}</td>
                  <td>{item.depotInDate || "-"}</td>
                  <td>{item.vesselVoyage || "-"}</td>
                  <td>{item.sobDate || "-"}</td>
                  <td>{item.ataDate || "-"}</td>
                  <td>{item.tareWeight || "-"}</td>
                  <td>{item.maxGrossWeight || "-"}</td>
                  <td>{item.containerType || "-"}</td>
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
    </div>

  );
}

export default ActiveTable;

