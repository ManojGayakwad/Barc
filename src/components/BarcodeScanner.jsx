import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Select,
  Input,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import Quagga from "quagga"; // Import Quagga library for barcode scanning

const BarcodeScanner = () => {
  const [scannedText, setScannedText] = useState(""); // State to hold scanned barcode text
  const [scanning, setScanning] = useState(false); // State to track scanning status
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to track success message display

  // Function to initialize Quagga and start barcode scanning
  const initializeBarcodeScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"), // Target element for displaying camera feed
          constraints: {
            width: 400,
            height: 300,
            facingMode: "environment", // Use the back camera
          },
        },
        decoder: {
          readers: ["ean_reader"], // Specify the barcode type to scan (EAN)
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    // Event listener for when barcode is detected
    Quagga.onDetected((data) => {
      setScannedText(data.codeResult.code); // Set scanned barcode text
      setShowSuccessMessage(true); // Display success message
      setTimeout(() => {
        setShowSuccessMessage(false); // Hide success message after a short delay
        stopBarcodeScanner(); // Stop scanning after displaying success message
      }, 2000); // 2000 milliseconds (2 seconds)
    });
  };

  // Function to stop barcode scanning
  const stopBarcodeScanner = () => {
    Quagga.stop();
    setScanning(false); // Update scanning status
  };

  // Function to start scanning when button is clicked
  const handleScanButtonClick = () => {
    setScannedText(""); // Clear previous scanned text
    setScanning(true); // Update scanning status
    setShowSuccessMessage(false); // Hide success message
    initializeBarcodeScanner();
  };

  return (
    <Box style={{display:"block", marginLeft:"220px"}}>
      <div id="barcode-scanner"></div>
      <Button
        onClick={handleScanButtonClick}
        disabled={scanning} // Disable button while scanning is in progress
        colorScheme="blue"
        mt={4}
      >
        {scanning ? "Scanning..." : "Scan Barcode"}
      </Button>
      {showSuccessMessage && (
        <Box mt={4} color="green">
          Scan Successful!
        </Box>
      )}
      <Box mt={4}>
        <table>
          <thead>
            <tr>
              <th>Scanned Barcode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{scannedText}</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default BarcodeScanner;
