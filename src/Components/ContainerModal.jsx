// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { createContainerRequest } from "../Redux_saga/Actions/Table_Action";



// // const ContainerModal = () => {
// //   const dispatch = useDispatch();
// //   const { modalOpen, loading } = useSelector((state) => state.container);

// //   const [formData, setFormData] = useState({
// //     containerNo: "",
// //     containerType: "",
// //     productType: "",
// //     depot: "",
// //     location: "",
// //     principal: "",
// //     yom: "",
// //     tareWeight: "",
// //     maxGrossWeight: "",
// //     grade: "",
// //     status: "",
// //     notes: "",
// //   });

// //   const [errors, setErrors] = useState({});

// //   if (!modalOpen) return null;

// //   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

// //   const validateForm = () => {
// //     let newErrors = {};
// //     Object.keys(formData).forEach((key) => {
// //       if (!formData[key]) newErrors[key] = "Required";
// //     });
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (validateForm()) {
// //       dispatch(createContainerRequest(formData));
// //     }
// //   };

// //   return (
// //     <div className="modal show d-block" tabIndex="-1">
// //       <div className="modal-dialog modal-lg">
// //         <div className="modal-content">
// //           <div className="modal-header">
// //             <h5 className="modal-title">Manage Container</h5>
// //             {/* <button type="button" className="btn-close" onClick={() => dispatch(closeContainermodal())}></button> */}
// //           </div>
// //           <div className="modal-body">
// //             <form onSubmit={handleSubmit}>
// //               <div className="row">
// //                 {Object.keys(formData).map((field) => (
// //                   <div className="col-md-6 mb-3" key={field}>
// //                     <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// //                     <input
// //                       type="text"
// //                       name={field}
// //                       value={formData[field]}
// //                       onChange={handleChange}
// //                       className={`form-control ${errors[field] ? "is-invalid" : ""}`}
// //                     />
// //                     {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
// //                   </div>
// //                 ))}
// //               </div>
// //               <button type="submit" className="btn btn-primary" disabled={loading}>
// //                 {loading ? "Submitting..." : "Submit"}
// //               </button>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ContainerModal;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// function ContainerModal({ show, onClose, onSubmit }) {
//   const [formData, setFormData] = useState({
//     containerNo: "",
//     containerType: "",
//     productType: "",
//     currentLocation: "",
//     currentDepo: "",
//     principal: "",
//     yom: "",
//     tareWeight: "",
//     maxGrossWeight: "",
//     status: "",
//     grade: "",
//     notes: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Validation
//   const validate = () => {
//     let newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key].trim()) {
//         newErrors[key] = "Required";
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit
//   const handleSubmit = () => {
//     if (validate()) {
//       onSubmit(formData);
//       onClose();
//     }
//   };

//   if (!show) return null;

//   return (
//     <div
//       className="modal fade show d-block"
//       tabIndex="-1"
//       style={{ background: "rgba(0,0,0,0.5)" }}
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Manage Container</h5>
//             <button className="btn-close" onClick={onClose}></button>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               {[
//                 { label: "Container No", name: "containerNo" },
//                 { label: "Container Type", name: "containerType" },
//                 { label: "Choose Product Type", name: "productType" },
//                 { label: "Current Location", name: "currentLocation" },
//                 { label: "Current Depot", name: "currentDepo" },
//                 { label: "Principal", name: "principal" },
//                 { label: "YOM", name: "yom", type: "date" },
//                 { label: "Tare Weight", name: "tareWeight" },
//                 { label: "Max Gross Weight", name: "maxGrossWeight" },
//                 { label: "Choose Status", name: "status" },
//                 { label: "Grade", name: "grade" },
//                 { label: "Notes", name: "notes" },
//               ].map((field, idx) => (
//                 <div className="col-md-6 mb-3" key={idx}>
//                   <label className="form-label">{field.label}</label>
//                   <input
//                     type={field.type || "text"}
//                     name={field.name}
//                     value={formData[field.name]}
//                     onChange={handleChange}
//                     className={`form-control border-0 border-bottom ${
//                       errors[field.name] ? "is-invalid" : ""
//                     }`}
//                   />
//                   {errors[field.name] && (
//                     <div className="text-danger">{errors[field.name]}</div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="modal-footer d-flex justify-content-end">
//             <button className="btn btn-secondary" onClick={onClose}>
//               Cancel
//             </button>
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContainerModal;


import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createContainerRequest } from "../Redux_saga/Actions/Table_Action";
import { useNavigate } from "react-router-dom";

function ContainerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    containerNo: "",
    containerType: "",
    productType: "",
    currentLocation: "",
    currentDepo: "",
    principal: "",
    yom: "",
    tareWeight: "",
    maxGrossWeight: "",
    status: "",
    grade: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [groups,setGroups] = useState([]);
  const [ports,setPorts] = useState([]);

  // useEffect(()=>{
  //   if(show){

  //   }
  // })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      
      navigate("/active-table"); // back to table page after submit
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Create New Container</h3>
      <div className="row">
        {[
          { label: "Container No", name: "containerNo" },
          { label: "Container Type", name: "containerType" },
          { label: "Choose Product Type", name: "productType" },
          { label: "Current Location", name: "currentLocation" },
          { label: "Current Depot", name: "currentDepo" },
          { label: "Principal", name: "principal" },
          { label: "YOM", name: "yom", type: "date" },
          { label: "Tare Weight", name: "tareWeight" },
          { label: "Max Gross Weight", name: "maxGrossWeight" },
          { label: "Choose Status", name: "status" },
          { label: "Grade", name: "grade" },
          { label: "Notes", name: "notes" },
        ].map((field, idx) => (
          <div className="col-md-6 mb-3" key={idx}>
            <label className="form-label">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`form-control border-0 border-bottom ${
                errors[field.name] ? "is-invalid" : ""
              }`}
            />
            {errors[field.name] && (
              <div className="text-danger">{errors[field.name]}</div>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={() => navigate("/active-table")}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ContainerForm;

