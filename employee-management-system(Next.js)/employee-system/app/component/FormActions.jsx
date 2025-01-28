import React from "react";
import Link from "next/link";

const FormActions = ({ update, onSubmit, onCancel }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 mt-8 mb-4">
      <button
        type="submit"
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {update ? "Save" : "Create"}
      </button>

      <Link href="/employee/employeeList">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </Link>
    </div>
  );
};

export default FormActions;