import Employee from "@/app/types/Employee";

interface TableProps {
    data: Employee[];
    pageIndex: number;
    reload: boolean;
    onSelect: (selectedIds: string[]) => void;
    sendEmployees: (employees: Employee[]) => void;
    fileID?: string;
    onFilePreview: (fileID: string) => void; // New prop
}


export default TableProps;