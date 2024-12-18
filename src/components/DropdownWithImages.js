import React from "react";

const DropdownWithImages = ({ options, onChange, value }) => {
    return (
        <div style={{ marginTop: "20px" }}>
            <label>Choose a Country: </label>
            <select value={value} onChange={onChange}>
                <option value="">--Select--</option>
                {options?.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
                ))}
            </select>

            {/* Display selected country flag */}
            {value && (
                <div style={{ marginTop: "10px" }}>
                    {options
                        ?.filter((country) => country.value === value)
                        ?.map((country) => (
                            <div key={country.value}>
                                <img
                                    src={country.image}
                                    alt={country.name}
                                    style={{ width: "100px", height: "auto" }}
                                />
                                <p>{country.name}</p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default DropdownWithImages;
