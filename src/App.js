
/**Single selection box without API */
// import React, { useState } from "react";
// import { dropdown1Data, dropdown2Data, dropdown3Data } from "./data/dropdownData";
// import Dropdown1 from "./components/Dropdown1";
// import Dropdown2 from "./components/Dropdown2";
// import Dropdown3 from "./components/Dropdown3";

// function App() {
//   const [dropdown1Value, setDropdown1Value] = useState("");
//   const [dropdown2Value, setDropdown2Value] = useState("");
//   const [dropdown3Options, setDropdown3Options] = useState([]);
//   const [dropdown3Value, setDropdown3Value] = useState(""); // Track selected value in dropdown3

//   // Handlers
//   const handleDropdown1Change = (e) => {
//     const selectedValue = e.target.value;
//     setDropdown1Value(selectedValue);
//     setDropdown2Value(""); // Reset dropdown2 value
//     setDropdown3Options([]); // Reset dropdown3 options
//     setDropdown3Value(""); // Reset dropdown3 selected value
//   };

//   const handleDropdown2Change = (e) => {
//     const selectedValue = e.target.value;
//     setDropdown2Value(selectedValue);
//     setDropdown3Options([]); // Clear the options in dropdown3 when dropdown2 changes
//     setDropdown3Value(""); // Reset dropdown3 value when dropdown2 changes

//     // Logic to update dropdown3 options based on dropdown2 selection
//     if (dropdown1Value === "objects") {
//       const selectedLabel = dropdown2Data.objects.find(
//         (obj) => obj.id.toString() === selectedValue
//       )?.name;
//       setDropdown3Options(dropdown3Data[selectedLabel] || []); // Set options for dropdown3 based on selected value
//     } else {
//       setDropdown3Options(dropdown3Data[selectedValue] || []); // Set options for dropdown3 based on selected value
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Interconnected Dropdowns</h1>
//       {/* First Dropdown */}
//       <Dropdown1
//         options={dropdown1Data}
//         onChange={handleDropdown1Change}
//         value={dropdown1Value}
//       />
//       {/* Second Dropdown */}
//       {dropdown1Value && (
//         <Dropdown2
//           options={dropdown2Data[dropdown1Value]}
//           onChange={handleDropdown2Change}
//           value={dropdown2Value}
//           dataType={dropdown1Value}
//         />
//       )}
//       {/* Third Dropdown */}
//       {dropdown2Value && dropdown3Options.length > 0 && (
//         <Dropdown3
//           options={dropdown3Options}
//           value={dropdown3Value}
//           onChange={(e) => setDropdown3Value(e.target.value)} // Update dropdown3 value
//         />
//       )}
//     </div>
//   );
// }

// export default App;

/**with API */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [countries, setCountries] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [districtDetails, setDistrictDetails] = useState(null);

//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState(null);

//   const fetchCountryDetails = async () => {
//     const response = await axios.get(`http://localhost:4000/location_selector/countries`);
//     if (response?.data?.status === true) {
//       setCountries(response?.data?.data);
//     }
//   };

//   useEffect(() => {
//     fetchCountryDetails();
//   }, []);

//   // Fetch states based on selected country
//   const fetchStates = async (country) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/location_selector/states?countryname=${country}`);
//       setStates(response?.data?.data?.states);
//       setSelectedState('');
//       setSelectedDistrict('');
//       setDistrictDetails(null);
//     } catch (error) {
//       console.error('Error fetching states', error);
//     }
//   };

//   // Fetch districts based on selected state and country
//   const fetchDistricts = async (country, state) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/location_selector/districts?countryname=${country}&statename=${state}`);
//       setSelectedDistrict('');
//       setDistrictDetails(response?.data?.data);
//     } catch (error) {
//       console.error('Error fetching districts', error);
//     }
//   };

//   // Handle country change
//   const handleCountryChange = (e) => {
//     const country = e.target.value;
//     setSelectedCountry(country);
//     setSelectedDistrict("")
//     setSelectedState("")
//     setDistricts("")
//     fetchStates(country);
//   };

//   // Handle state change
//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setDistricts('');
//     fetchDistricts(selectedCountry, state);
//   };

//   // Handle district change
//   const handleDistrictChange = (e) => {
//     setSelectedDistrict(e.target.value);
//     console.log("........................", selectedDistrict)
//     const data = districtDetails.find(district => district.name === e.target.value);
//     setDistricts(data);
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ color: '#333', fontSize: '24px' }}>Location Selector</h1>

//       {/* Country Dropdown */}
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ fontSize: '16px' }}>Choose a country: </label>
//         <select
//           value={selectedCountry}
//           onChange={handleCountryChange}
//           style={{ padding: '8px', width: '200px', fontSize: '14px', borderRadius: '5px' }}
//         >
//           <option value="">--Select--</option>
//           {countries && countries?.map((item, index) => (
//             <option key={index} value={item.name}>
//               {item.code} {item.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* State Dropdown */}
//       <div style={{ marginBottom: '15px' }}>
//         <label htmlFor="state" style={{ fontSize: '16px' }}>Choose a State: </label>
//         <select
//           id="state"
//           value={selectedState}
//           onChange={handleStateChange}
//           disabled={!selectedCountry}
//           style={{ padding: '8px', width: '200px', fontSize: '14px', borderRadius: '5px' }}
//         >
//           <option value="">Select State</option>
//           {states && states?.map((item, index) => (
//             <option key={index} value={item?.name}>{item?.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* District Dropdown */}
//       <div style={{ marginBottom: '20px' }}>
//         <label htmlFor="district" style={{ fontSize: '16px' }}>District: </label>
//         <select
//           id="district"
//           value={selectedDistrict}
//           onChange={handleDistrictChange}
//           disabled={!selectedState}
//           style={{ padding: '8px', width: '200px', fontSize: '14px', borderRadius: '5px' }}
//         >
//           <option value="">Select District</option>
//           {districtDetails && districtDetails?.map((district, index) => (
//             <option key={index} value={district?.name}>{district?.name}</option>
//           ))}
//         </select>

//         {districts && (
//           <div style={{ marginTop: '20px' }}>
//             <h3 style={{ fontSize: '18px', color: '#444', marginLeft: "50px" }}>District Details</h3>
//             <span style={{ marginLeft: "20px" }}><strong>District Name:</strong> {districts?.name}</span>
//             <span style={{ marginLeft: "20px" }}><strong>Area Size (sq km):</strong> {districts?.areaSize}</span>
//             <span style={{ marginLeft: "20px" }}><strong>Population:</strong> {districts?.population}</span>
//             <div>{districts?.file_path.includes('.pdf') ? (
//               <embed src={districts?.file_path} type="application/pdf" height="700px" width="800"></embed>
//             ) : (
//               "No Pdf Found"
//             )}</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import Select from "react-select";

const App = () => {
  const dropdown1Options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const dropdown2Options = {
    chocolate: [
      { value: "123", label: "123" },
      { value: "alpha", label: "Alpha" },
    ],
    strawberry: [
      { value: "strawberry1", label: "Strawberry1" },
      { value: "strawberry2", label: "Strawberry2" },
    ],
    vanilla: [
      { value: "vanillaA", label: "VanillaA" },
      { value: "vanillaB", label: "VanillaB" },
    ],
  };

  const dropdown3Options = {
    "123": [
      { value: "A1", label: "A1" },
      { value: "A2", label: "A2" },
    ],
    alpha: [
      { value: "B1", label: "B1" },
      { value: "B2", label: "B2" },
    ],
    strawberry1: [
      { value: "C1", label: "C1" },
      { value: "C2", label: "C2" },
    ],
    vanillaA: [
      { value: "D1", label: "D1" },
      { value: "D2", label: "D2" },
    ],
  };

  const [selectedDropdown1, setSelectedDropdown1] = useState([]);
  const [dropdown2FilteredOptions, setDropdown2FilteredOptions] = useState([]);
  const [selectedDropdown2, setSelectedDropdown2] = useState([]);
  const [dropdown3FilteredOptions, setDropdown3FilteredOptions] = useState([]);

  const handleDropdown1Change = (selected) => {
    setSelectedDropdown1(selected || []);
    const updatedDropdown2Options = selected
      ? selected.flatMap((item) => dropdown2Options[item.value] || [])
      : [];
    setDropdown2FilteredOptions(updatedDropdown2Options);
    setSelectedDropdown2([]);
    setDropdown3FilteredOptions([]);
  };

  const handleDropdown2Change = (selected) => {
    setSelectedDropdown2(selected || []);
    const updatedDropdown3Options = selected
      ? selected.flatMap((item) => dropdown3Options[item.value] || [])
      : [];
    setDropdown3FilteredOptions(updatedDropdown3Options);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Multi-Select Dropdowns</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Dropdown 1</h2>
        <Select
          isMulti
          options={dropdown1Options}
          value={selectedDropdown1}
          onChange={handleDropdown1Change}
        />
      </div>

      {dropdown2FilteredOptions?.length ?
        <div style={{ marginBottom: "20px" }}>
          <h2>Dropdown 2</h2>
          <Select
            isMulti
            options={dropdown2FilteredOptions}
            value={selectedDropdown2}
            onChange={handleDropdown2Change}
            isDisabled={dropdown2FilteredOptions.length === 0}
          />

        </div>
        : ""
      }

      {dropdown3FilteredOptions?.length ?
        <div>
          <h2>Dropdown 3</h2>
          <Select
            isMulti
            options={dropdown3FilteredOptions}
            isDisabled={dropdown3FilteredOptions.length === 0}
          />
        </div> : ""
      }
    </div>
  );
};

export default App;
