import "./receipt.css";

export default function MoneyReceiptTemplate({ data }) {
  return (
    <div id="receipt" className="receipt-page">

      {/* HEADER */}
      <div className="receipt-header">
        <div className="receipt-logo">
          <img src="/logo.jpg" alt="Company Logo" />
        </div>
        <div className="receipt-company">
          <p># 1st Floor, AH45, Krishna Reddy Industrial Estate</p>
          <p>Dooravani Nagar, Bengaluru, Karnataka 560016</p>
          <p>Website: www.reodevelop.com | Email: admin@reodevelop.com</p>
        </div>
      </div>

      <div className="receipt-title-box">
        <h1>MONEY RECEIPT</h1>
      </div>

      {/* META */}
      <div className="receipt-meta">
        <span><b>Date:</b> {data.date}</span>
        <span><b>Receipt No:</b> {data.receiptNo}</span>
      </div>

      {/* BODY */}
      <p className="receipt-text">
        Received with thanks from <b>{data.name}</b>
      </p>

      <p className="receipt-text">
        a sum of <b>₹ {data.amount}</b> (Rupees {data.amountWords} only)
        towards Booking Amount / Advance Payment for the property details mentioned below:
      </p>

      {/* DETAILS */}
      <div className="receipt-details-box">
        <div><span>Project Name</span><span>{data.projectName}</span></div>
        <div><span>Property Type</span><span>{data.propertyType}</span></div>
        <div><span>Location</span><span>{data.location}</span></div>
        <div><span>Area</span><span>{data.area}</span></div>
        <div><span>Transaction No</span><span>{data.transactionId}</span></div>
        <div><span>Payment Mode</span><span>{data.paymentMode}</span></div>
        <div><span>Payment Date</span><span>{data.paymentDate}</span></div>
      </div>

      {/* NOTE */}
      <div className="receipt-note-box">
        <p>
          An Agreement to Sell will be signed between both parties within 30 days from the date of this receipt,
          upon payment of 10% of the total agreed sale price, after adjusting the above token advance.
          This amount is received as booking/advance payment and will be adjusted against the total sale value,
          subject to company terms and conditions.
        </p>
      </div>

      {/* FOOTER */}
      <div className="receipt-footer">
        <div className="receipt-signature">
          <p>Authorized Signatory</p>
          <span>Executant (Seller)</span>
        </div>
        <p className="receipt-disclaimer">
          This is a computer-generated receipt; hence, no signature is required.
        </p>
      </div>

    </div>
  );
}
