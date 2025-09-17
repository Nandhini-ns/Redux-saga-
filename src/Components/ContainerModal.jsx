// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createContainerRequest } from "../Redux_saga/Actions/Table_Action";



// const ContainerModal = () => {
//   const dispatch = useDispatch();
//   const { modalOpen, loading } = useSelector((state) => state.container);

//   const [formData, setFormData] = useState({
//     containerNo: "",
//     containerType: "",
//     productType: "",
//     depot: "",
//     location: "",
//     principal: "",
//     yom: "",
//     tareWeight: "",
//     maxGrossWeight: "",
//     grade: "",
//     status: "",
//     notes: "",
//   });

//   const [errors, setErrors] = useState({});

//   if (!modalOpen) return null;

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const validateForm = () => {
//     let newErrors = {};
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) newErrors[key] = "Required";
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       dispatch(createContainerRequest(formData));
//     }
//   };

//   return (
//     <div className="modal show d-block" tabIndex="-1">
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Manage Container</h5>
//             {/* <button type="button" className="btn-close" onClick={() => dispatch(closeContainermodal())}></button> */}
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleSubmit}>
//               <div className="row">
//                 {Object.keys(formData).map((field) => (
//                   <div className="col-md-6 mb-3" key={field}>
//                     <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                     <input
//                       type="text"
//                       name={field}
//                       value={formData[field]}
//                       onChange={handleChange}
//                       className={`form-control ${errors[field] ? "is-invalid" : ""}`}
//                     />
//                     {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
//                   </div>
//                 ))}
//               </div>
//               <button type="submit" className="btn btn-primary" disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContainerModal;
