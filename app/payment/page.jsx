// app/payment/page.jsx
"use client";
// Add this at the top of your payment page
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get booking details from URL or state (in real app, you'd get from context/API)
  const bookingDetails = {
    bookingId: searchParams.get("bookingId") || "BK" + Math.floor(Math.random() * 10000),
    propertyType: searchParams.get("propertyType") || "Plot",
    projectName: searchParams.get("projectName") || "MEGA CITY KOLKATA",
    totalAmount: searchParams.get("totalAmount") || "",
    advanceAmount: searchParams.get("advanceAmount") || "",
  };

  const [paymentForm, setPaymentForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    amountPaid: bookingDetails.advanceAmount || "",
    transactionId: "",
    upiId: "",
    paymentMethod: "google_pay",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send this data to your backend
      console.log("Payment details submitted:", {
        ...paymentForm,
        bookingId: bookingDetails.bookingId,
        timestamp: new Date().toISOString()
      });

      // Show success message
      setPopup({
        type: "success",
        message: `Payment Successful!\n\nBooking ID: ${bookingDetails.bookingId}\nTransaction ID: ${paymentForm.transactionId}\nAmount: ₹${paymentForm.amountPaid}\n\nOur team will contact you within 24 hours.`
      });
      
      setIsPaymentSuccess(true);
      
      // In a real app, you might redirect to a success page or generate receipt
      setTimeout(() => {
        setPopup(null);
        // Redirect to welcome page or download receipt
        // router.push(`/success?bookingId=${bookingDetails.bookingId}`);
      }, 3000);
      
    } catch (error) {
      setPopup({
        type: "error",
        message: "Payment submission failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentMethods = [
    { id: "google_pay", name: "Google Pay", color: "#5F6368" },
    { id: "phonepe", name: "PhonePe", color: "#5F259F" },
    { id: "paytm", name: "Paytm", color: "#20336B" },
    { id: "bank_transfer", name: "Bank Transfer", color: "#1E3A8A" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Booking Info */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 bg-white rounded-xl shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Booking Payment</h1>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Booking ID:</span>
              <span className="ml-2 font-semibold text-blue-700">{bookingDetails.bookingId}</span>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Property:</span>
              <span className="ml-2 font-semibold text-blue-700">{bookingDetails.propertyType}</span>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Project:</span>
              <span className="ml-2 font-semibold text-blue-700">{bookingDetails.projectName}</span>
            </div>
            {bookingDetails.advanceAmount && (
              <div className="bg-yellow-50 px-4 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Advance Due:</span>
                <span className="ml-2 font-semibold text-yellow-700">₹{bookingDetails.advanceAmount}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Payment Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl rounded-2xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] overflow-hidden bg-white/10 backdrop-blur-xl border border-blue-500/60"
        >
          {/* LEFT SIDE - QR Code */}
          <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 p-6 md:p-8 text-white">
            <h2 className="text-2xl font-bold mb-2 text-yellow-300 text-center">
              Ilfeo Real Estate
            </h2>
            <p className="text-lg font-semibold mb-1">MEGA CITY KOLKATA</p>
            <h3 className="text-xl font-semibold mb-4">Scan & Pay</h3>

            {/* Payment Method Selector */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentForm({ ...paymentForm, paymentMethod: method.id })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    paymentForm.paymentMethod === method.id
                      ? "bg-white text-blue-600"
                      : "bg-blue-900/50 text-white/80 hover:bg-blue-900"
                  }`}
                  style={{ borderColor: method.color }}
                >
                  {method.name}
                </button>
              ))}
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-2xl shadow-xl mb-4">
              <div className="relative">
                {/* Replace with your actual QR code image */}
                <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="text-gray-500 text-sm">Google Pay QR Code</p>
                    <p className="text-gray-400 text-xs mt-1">Scan to pay</p>
                  </div>
                </div>
                
                {/* In production, use actual QR image:
                <Image
                  src="/images/google-pay-qr.jpg"
                  alt="Payment QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                */}
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="text-center space-y-2 max-w-md">
              <p className="text-sm text-blue-100">
                <span className="font-semibold">Instructions:</span> Scan QR code using any UPI app
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">1</span>
                </div>
                <span className="text-sm">Open Google Pay/PhonePe/Paytm</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">2</span>
                </div>
                <span className="text-sm">Scan QR code or enter UPI ID</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">3</span>
                </div>
                <span className="text-sm">Enter amount and complete payment</span>
              </div>
            </div>

            <p className="text-xs text-blue-200 mt-4 text-center">
              Once payment is completed, fill the form on the right side.
            </p>
          </div>

          {/* RIGHT SIDE - Payment Form */}
          <div className="md:w-1/2 bg-white text-gray-800 flex flex-col justify-start rounded-r-xl overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Logo */}
              <div className="flex justify-center mb-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-blue-700">Ilfeo</h1>
                  <p className="text-sm text-gray-600">REAL ESTATES OPPORTUNITY</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-center text-blue-600 mb-2">
                Payment Details
              </h3>
              <p className="text-center text-gray-600 mb-6">
                Enter your payment information after completing the transaction
              </p>

              {isPaymentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for your payment. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Return to Home
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={paymentForm.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={paymentForm.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email ID *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={paymentForm.email}
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount Paid (₹) *
                      </label>
                      <input
                        type="number"
                        name="amountPaid"
                        value={paymentForm.amountPaid}
                        onChange={handleInputChange}
                        placeholder="Enter amount paid"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Transaction ID / UTR Number *
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={paymentForm.transactionId}
                        onChange={handleInputChange}
                        placeholder="Enter transaction ID"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID (Optional)
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentForm.upiId}
                      onChange={handleInputChange}
                      placeholder="Enter your UPI ID"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition text-lg ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Submit Payment Details"
                      )}
                    </motion.button>
                  </div>
                </form>
              )}

              {/* Important Notes */}
              {!isPaymentSuccess && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Important Instructions
                  </h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Keep your payment receipt for future reference</li>
                    <li>• Transaction ID is mandatory for verification</li>
                    <li>• Payment confirmation may take 15-30 minutes</li>
                    <li>• Contact support if payment fails</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Payment Methods Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold text-gray-800 mb-2">UPI Payment</h4>
            <p className="text-sm text-gray-600">Scan QR code or use UPI ID: ilfeo.realestate@okhdfcbank</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Bank Transfer</h4>
            <p className="text-sm text-gray-600">Account: Ilfeo Real Estate<br />IFSC: HDFC0001234</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
            <p className="text-sm text-gray-600">Email: payments@ilfeo.com<br />Phone: +91 98765 43210</p>
          </div>
        </motion.div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60"
          >
            <div className={`px-6 py-5 sm:px-8 sm:py-6 rounded-2xl text-center shadow-lg max-w-sm sm:max-w-md w-[90%] ${
              popup.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`}>
              <p className="whitespace-pre-line text-center leading-relaxed text-white mb-4">
                {popup.message}
              </p>

              <button
                onClick={() => setPopup(null)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm sm:text-base"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}