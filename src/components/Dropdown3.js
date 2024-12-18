import React from "react";

const Dropdown3 = ({ options, value, onChange }) => {
    return (
        <div style={styles.container}>
            <label style={styles.label}>Choose a property: </label>
            <select value={value} onChange={onChange} style={styles.select}>
                <option value="">--Select--</option> {/* Default placeholder */}
                {options.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
};

const styles = {
    container: {
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        width: "250px",
    },
    label: {
        marginBottom: "8px",
        fontWeight: "bold",
    },
    select: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#f9f9f9",
        cursor: "pointer",
    },
};

export default Dropdown3;
