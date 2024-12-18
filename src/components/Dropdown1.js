import React from "react";

const Dropdown1 = ({ options, onChange, value }) => {
    return (
        <div style={styles.container}>
            <label style={styles.label}>Choose a data type: </label>
            <select value={value} onChange={onChange} style={styles.select}>
                <option value="">--Select--</option>
                {options.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
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

export default Dropdown1;
