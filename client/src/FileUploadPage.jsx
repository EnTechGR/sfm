import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import the xlsx library

const FileUploadPage = () => {
  const { id } = useParams(); // Get the vehicle ID from the route
  const [excelData, setExcelData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      setError("Please select an Excel file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryString = e.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // header: 1 gets array of arrays

      // Process the data to create an array of objects with column headers
      if (data.length > 0) {
        const headers = data[0];
        const rows = data.slice(1).map(row => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index];
          });
          return rowData;
        });
        setExcelData(rows);
        setError("");
      } else {
        setError("The Excel file is empty or has no data.");
        setExcelData([]);
      }
    };

    reader.onerror = () => {
      setError("Error reading the Excel file.");
      setExcelData([]);
    };

    reader.readAsBinaryString(selectedFile);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Excel for Vehicle ID: {id}</h1>
      <input type="file" accept=".xlsx, .csv" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleFileUpload} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Upload and Process
      </button>
      {error && <p className="text-red-500">{error}</p>}

      {excelData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Excel Data:</h2>
          {excelData.map((row, index) => (
            <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h3 className="font-semibold mb-2">Row {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(row).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{key}:</label>
                    <input
                      type="text"
                      value={value || ''}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      readOnly // Make it read-only for display, remove if you want to allow editing
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadPage;