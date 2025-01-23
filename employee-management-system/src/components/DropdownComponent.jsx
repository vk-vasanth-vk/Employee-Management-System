import React from "react";
import { Button } from "@mui/material";

const DropdownComponent = ({
                               roleList,
                               filteredDept,
                               setFilteredDept,
                               filteredRole,
                               setFilteredRole,
                               onApply,
                               onClear,
                               onClose,
                           }) => (
    <div className="absolute top-0 right-0 z-10 w-[400px] bg-white border-l">
        <div className="shadow-md flex items-center p-4">
            <img
                src="/close.png"
                alt="Close"
                className="w-8 h-8 cursor-pointer"
                onClick={onClose}
            />
            <Button
                variant="contained"
                disabled={!filteredDept && !filteredRole}
                onClick={onApply}
                style={{ marginLeft: "auto", marginRight: 8 }}
            >
                Apply
            </Button>
            <Button
                variant="contained"
                color="error"
                disabled={!filteredDept && !filteredRole}
                onClick={onClear}
            >
                Clear
            </Button>
        </div>
        <div>
            <h3>Department</h3>
            <ul>
                {["Design", "Development", "Testing", "Human Resource"].map((dept) => (
                    <li
                        key={dept}
                        className={filteredDept === dept ? "bg-gray-200" : ""}
                        onClick={() => setFilteredDept(dept)}
                    >
                        {dept}
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <h3>Role</h3>
            <ul>
                {roleList
                    .filter((role) => !filteredDept || role.dept === filteredDept)
                    .map((role) => (
                        <li
                            key={role.role}
                            className={filteredRole === role.role ? "bg-gray-200" : ""}
                            onClick={() => setFilteredRole(role.role)}
                        >
                            {role.role}
                        </li>
                    ))}
            </ul>
        </div>
    </div>
);

export default DropdownComponent;
