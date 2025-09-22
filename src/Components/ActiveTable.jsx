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
import ContainerModal from "./ContainerModal"; 

function ActiveTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { containers, loading, error, selectedContainer } = useSelector(
    (state) => state.container
  );
  console.log(selectedContainer)
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
 const [showModal, setShowModal] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("authToken");
   sessionStorage.clear();
  window.location.href = "/loginform"; 
};

   const handleView = (item) => {
     dispatch(viewContainerRequest(item.id));
      setShowModal(true);
    toast.info(`Viewing container: ${item.containerNo}`);
  };

  const handleEdit = (item) => {
     const updatedData = { ...item, status: "UPDATED" }; // sample update
    dispatch(editContainerRequest(item.id, updatedData));
    toast.warning(`Editing container: ${item.containerNo}`);
  };

  // const [isEditMode, setIsEditMode] = useState(false);
  //  const handleCreate = () => {
  //   const newData = {
  //     containerNo: "NEW12345",
  //     productType: "20FT",
  //     status: "ACTIVE",
  //     currentDepo: "CHENNAI",
  //   };
  //   dispatch(createContainerRequest(newData));
    
  // };

  //create containermodal
  const [showManageModal, setShowManageModal] = useState(false);

  const handleOpenModal = () => {
    setShowManageModal(true); // modal open
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
      <div className="d-flex justify-content-between align-items-center mb-3">
     <button
  className="btn btn-success"
  onClick={() => navigate("/containermodal")}
>
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
       {/* Modal for container details */}
      {/* {showModal && selectedContainer && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Container Booking Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>Container No</th>
                      <td>{selectedContainer?.data?.containerNo}</td>
                    </tr>
                    <tr>
                      <th>Depot</th>
                      <td>{selectedContainer?.data?.currentDepo}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td>{selectedContainer?.data?.status}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{selectedContainer?.data?.containerType}</td>
                    </tr>              
                    <tr>
                      <th>Location</th>
                    <td>{selectedContainer?.data?.currentLocation || "-"}</td>
                    </tr>
                   <tr>
                    <th>Shipper/Consignee</th>
                     <td>{selectedContainer?.data?.shipperConsignee || "-"}</td>
                   </tr>
                   <tr>
                    <th>Pickup Date</th>
                      <td>{selectedContainer?.data?.pickUpDate || "-"}</td>
                    </tr>
                    <tr>
            <th>Depot In</th>
            <td>{selectedContainer?.data?.depotInDate || "-"}</td>
             </tr>
             <tr>
              <th>VSL/VOY</th>
               <td>{selectedContainer?.data?.vesselVoyage || "-"}</td>
              </tr>
             <tr>
               <th>SOB</th>
                <td>{selectedContainer?.data?.sobDate || "-"}</td>
               </tr>
                <tr>
                <th>ATA</th>
                 <td>{selectedContainer?.data?.ataDate || "-"}</td>
                </tr>
                 <tr>
                 <th>Tare Weight</th>
                 <td>{selectedContainer?.data?.tareWeight || "-"}</td>
                 </tr>
                 <tr>
                  <th>Max Gross Weight</th>
                   <td>{selectedContainer?.data?.maxGrossWeight || "-"}</td>
                  </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* Modal for container details */}
{showModal && selectedContainer && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Container Booking Details</h5>
          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          {/* Container Info Card */}
          <div className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Container No:</strong> {selectedContainer?.data?.containerNo}</p>
                  <p><strong>Type:</strong> {selectedContainer?.data?.containerType}</p>
                  <p><strong>Current Depot:</strong> {selectedContainer?.data?.currentDepo}</p>
                  <p><strong>Location:</strong> {selectedContainer?.data?.currentLocation || "-"}</p>
                </div>
                {/* <div className="col-md-6">
                  <p><strong>Status:</strong> {selectedContainer?.data?.status}</p>
                  <p><strong>Shipper/Consignee:</strong> {selectedContainer?.data?.shipperConsignee || "-"}</p>
                  <p><strong>Tare Weight:</strong> {selectedContainer?.data?.tareWeight || "-"}</p>
                  <p><strong>Max Gross Weight:</strong> {selectedContainer?.data?.maxGrossWeight || "-"}</p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Booking Table */}
          <h6 className="mb-3">Booking Details</h6>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>S.No</th>
                  <th>Booking Date</th>
                  <th>Booking No</th>
                  <th>BL No</th>
                  <th>POL</th>
                  <th>Pickup Date</th>
                  <th>Port In Date</th>
                  <th>SOB Date</th>
                  <th>ATA Date</th>
                  <th>Depot In Date</th>
                  <th>POD</th>
                  <th>Booking Agent</th>
                  <th>Delivery Agent</th>
                </tr>
              </thead>
              <tbody>
                {selectedContainer?.data?.bookings?.length > 0 ? (
                  selectedContainer.data.bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{booking.bookingDate || "-"}</td>
                      <td>{booking.bookingNo || "-"}</td>
                      <td>{booking.blNo || "-"}</td>
                      <td>{booking.pol || "-"}</td>
                      <td>{booking.pickUpDate || "-"}</td>
                      <td>{booking.portInDate || "-"}</td>
                      <td>{booking.sobDate || "-"}</td>
                      <td>{booking.ataDate || "-"}</td>
                      <td>{booking.depotInDate || "-"}</td>
                      <td>{booking.pod || "-"}</td>
                      <td>{booking.bookingAgent || "-"}</td>
                      <td>{booking.deliveryAgent || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center">
                      No Booking Records Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
   
   {/* {showManageModal && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-md">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {isEditMode ? "Edit Container" : "New Container"}
          </h5>
          <button
            className="btn-close"
            onClick={() => setShowManageModal(false)}
          ></button>
        </div>

        <div className="modal-body">
          {[
            { label: "Container No", name: "containerNo" },
            { label: "Container Type", name: "containerType" },
            { label: "Choose Product Type", name: "productType" },
            { label: "Current Location", name: "currentLocation" },
            { label: "Current Depot", name: "currentDepo" },
            { label: "Principal", name: "principal" },
            { label: "YOM", name: "yom" },
            { label: "Tare Weight", name: "tareWeight" },
            { label: "Max Gross Weight", name: "maxGrossWeight" },
            { label: "Choose Status", name: "status" },
            { label: "Grade", name: "grade" },
            { label: "Notes", name: "notes" },
          ].map((field, idx) => (
            <div className="mb-3" key={idx}>
              <label className="form-label">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleFormChange}
                className="form-control border-0 border-bottom"
              />
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setShowManageModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  </div>
)} */}
 </div>

  );
}

export default ActiveTable;

