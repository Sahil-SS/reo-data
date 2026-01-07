// app/page.jsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function BookingForm() {
  // Customer details state
  const [customerDetails, setCustomerDetails] = useState({
    fullName: "",
    fatherHusbandName: "",
    mobileNumber: "",
    email: "",
    address: "",
    pan: "",
    aadhar: "",
    idProofNumber: "",
  });

  // Property details state
  const [propertyDetails, setPropertyDetails] = useState({
    propertyType: "Plot",
    projectLocation: "",
    projectName: "MEGA CITY KOLKATA",
    unitPlotNumber: "",
    area: "",
    plotSize: "1000 SG. FT.",
    ratePerSqFt: "",
    plotNo: "",
  });

  // Payment details state
  const [paymentDetails, setPaymentDetails] = useState({
    paymentOption: "one-time",
    emiTenure: "24",
    tokenAdvance: "",
    totalPropertyValue: "",
    paymentMode: "UPI",
    transactionNumber: "",
    bookingAmountPaid: "",
  });

  // Calculate remaining balance
  const calculateRemainingBalance = () => {
    const total = parseFloat(paymentDetails.totalPropertyValue) || 0;
    const advance = parseFloat(paymentDetails.tokenAdvance) || 0;
    return (total - advance).toFixed(2);
  };

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    if (section === "customer") {
      setCustomerDetails({ ...customerDetails, [field]: value });
    } else if (section === "property") {
      setPropertyDetails({ ...propertyDetails, [field]: value });
    } else if (section === "payment") {
      const updated = { ...paymentDetails, [field]: value };
      
      // Auto-calculate total value if rate and area are provided
      if (field === "ratePerSqFt" || field === "area") {
        const rate = field === "ratePerSqFt" ? value : paymentDetails.ratePerSqFt;
        const area = field === "area" ? value : propertyDetails.area;
        if (rate && area) {
          updated.totalPropertyValue = (parseFloat(rate) * parseFloat(area)).toString();
        }
      }
      setPaymentDetails(updated);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log({
      customerDetails,
      propertyDetails,
      paymentDetails,
      remainingBalance: calculateRemainingBalance()
    });
    // alert("Form submitted successfully! Redirecting to payment...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Ilfeo</h1>
          <h2 className="text-2xl font-semibold text-blue-700 mb-1">
            REAL ESTATES OPPORTUNITY
          </h2>
          <h3 className="text-xl font-bold text-gray-700">
            PLOT SALE / CUSTOMER BOOKING FORM
          </h3>
          <p className="text-gray-600 mt-2">
            Office Address: RDB Boulevard, 8th Floor, EP & GP Complex, Salt Lake, Kolkata – 700 091
          </p>
        </div>

        {/* Main Form Container - A4 Size Simulation */}
        <div className="bg-white shadow-2xl rounded-lg border border-gray-300 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Details */}
            <div className="border-2 border-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">
                Project Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={propertyDetails.projectName}
                        onChange={(e) => handleInputChange("property", "projectName", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plot Size
                      </label>
                      <input
                        type="text"
                        value={propertyDetails.plotSize}
                        onChange={(e) => handleInputChange("property", "plotSize", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                        placeholder="Enter plot size"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Property Type
                      </label>
                      <select
                        value={propertyDetails.propertyType}
                        onChange={(e) => handleInputChange("property", "propertyType", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                      >
                        <option value="Plot">Plot</option>
                        <option value="Flat">Flat</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Villa">Villa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={propertyDetails.projectLocation}
                        onChange={(e) => handleInputChange("property", "projectLocation", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                        placeholder="Enter project location"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 p-4 rounded-lg">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">PHOTO UPLOAD AREA</p>
                    <p className="text-xs mt-1">PHAISEDIA SEES PINCOPT (225)9403</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="border-2 border-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">
                Customer Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerDetails.fullName}
                      onChange={(e) => handleInputChange("customer", "fullName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father / Husband Name
                    </label>
                    <input
                      type="text"
                      value={customerDetails.fatherHusbandName}
                      onChange={(e) => handleInputChange("customer", "fatherHusbandName", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter father/husband name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={customerDetails.address}
                      onChange={(e) => handleInputChange("customer", "address", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      rows="2"
                      placeholder="Enter address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.mobileNumber}
                      onChange={(e) => handleInputChange("customer", "mobileNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email ID
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange("customer", "email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      value={customerDetails.pan}
                      onChange={(e) => handleInputChange("customer", "pan", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter PAN number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar Card Number
                    </label>
                    <input
                      type="text"
                      value={customerDetails.aadhar}
                      onChange={(e) => handleInputChange("customer", "aadhar", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter Aadhar number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ID Proof & Number
                    </label>
                    <input
                      type="text"
                      value={customerDetails.idProofNumber}
                      onChange={(e) => handleInputChange("customer", "idProofNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="e.g., Passport, Driver's License"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Selection */}
            <div className="border-2 border-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">
                Property Selection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit / Plot Number
                    </label>
                    <input
                      type="text"
                      value={propertyDetails.unitPlotNumber}
                      onChange={(e) => handleInputChange("property", "unitPlotNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter unit/plot number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area (sq.ft / sq.yd)
                    </label>
                    <input
                      type="number"
                      value={propertyDetails.area}
                      onChange={(e) => handleInputChange("property", "area", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter area"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plot No.
                    </label>
                    <input
                      type="text"
                      value={propertyDetails.plotNo}
                      onChange={(e) => handleInputChange("property", "plotNo", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter plot number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rate per SG.FT.
                    </label>
                    <input
                      type="number"
                      value={paymentDetails.ratePerSqFt}
                      onChange={(e) => handleInputChange("payment", "ratePerSqFt", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter rate per sq.ft"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="border-2 border-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">
                Payment Details
              </h2>
              
              {/* Payment Option Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Option
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="one-time"
                      checked={paymentDetails.paymentOption === "one-time"}
                      onChange={(e) => handleInputChange("payment", "paymentOption", e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2">One-Time Payment</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentOption"
                      value="emi"
                      checked={paymentDetails.paymentOption === "emi"}
                      onChange={(e) => handleInputChange("payment", "paymentOption", e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2">EMI Payment</span>
                  </label>
                </div>
                
                {/* EMI Tenure (only shown if EMI selected) */}
                {paymentDetails.paymentOption === "emi" && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EMI Tenure
                    </label>
                    <select
                      value={paymentDetails.emiTenure}
                      onChange={(e) => handleInputChange("payment", "emiTenure", e.target.value)}
                      className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                    >
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Property Value (₹)
                    </label>
                    <input
                      type="number"
                      value={paymentDetails.totalPropertyValue}
                      onChange={(e) => handleInputChange("payment", "totalPropertyValue", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter total value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Token Advance Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={paymentDetails.tokenAdvance}
                      onChange={(e) => handleInputChange("payment", "tokenAdvance", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter advance amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remaining Balance (₹)
                    </label>
                    <input
                      type="text"
                      value={calculateRemainingBalance()}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Amount Paid (₹)
                    </label>
                    <input
                      type="number"
                      value={paymentDetails.bookingAmountPaid}
                      onChange={(e) => handleInputChange("payment", "bookingAmountPaid", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter booking amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={paymentDetails.paymentMode}
                      onChange={(e) => handleInputChange("payment", "paymentMode", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Transaction / Cheque No.
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.transactionNumber}
                      onChange={(e) => handleInputChange("payment", "transactionNumber", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 placeholder:text-gray-400"
                      placeholder="Enter transaction/cheque number"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border-2 border-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center border-b pb-2">
                Terms & Conditions
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-700">
                    I hereby declare that the above information provided by me is true and correct. 
                    I agree to all terms and conditions of the {propertyDetails.projectName} project.
                  </label>
                </div>
                <div className="flex items-start">
                  <div className="w-4 h-4 mt-1 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="ml-2 text-green-600 font-medium">
                    Plot switching options available.
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Signature
                    </label>
                    <div className="w-64 border-b-2 border-gray-800 h-8"></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="w-48 border-b-2 border-gray-800 h-8"></div>
                  </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-4">
                  <p>PLASÉ PASTE PASSPORT SEE PHOTO (2022 INCH)</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Link href="/payment">
                <button
                  type="button"
                  className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  SUBMIT & PROCEED TO PAYMENT
                </button>
              </Link>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>This form is designed to resemble an A4 document for real estate booking purposes.</p>
          <p className="mt-1">After submission, you will be redirected to the payment gateway.</p>
        </div>
      </div>
    </div>
  );
}