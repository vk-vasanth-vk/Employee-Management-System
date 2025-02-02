import { createContext, useState, ReactNode, useContext } from "react";

type EmployeeContextType = {
  selectedEmployee: any;
  setSelectedEmployee: (employee: any) => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <EmployeeContext.Provider value={{ selectedEmployee, setSelectedEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
