"use client";

import { useEffect, useState } from "react";

const BRAND = "#db071d";

const STATUS_STYLE = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  success: "bg-green-100 text-green-800 border-green-300",
  failure: "bg-red-100 text-red-800 border-red-300",
};

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setBookings(data);
    setLoading(false);
  };

  // 🔁 Optimistic update (NO black screen)
  const updateStatus = async (id, status) => {
    setActionId(id);

    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, payment_status: status } : b
      )
    );

    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, payment_status: status }),
    });

    setActionId(null);
  };

  const deleteBooking = async (id) => {
    const ok = confirm("Are you sure you want to delete this booking?");
    if (!ok) return;

    setBookings((prev) => prev.filter((b) => b.id !== id));

    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  if (loading) {
    return <div className="p-8 text-lg">Loading bookings…</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: BRAND }}
      >
        Admin – Complete Bookings Table
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-[2200px] text-sm">
          <thead style={{ backgroundColor: BRAND }} className="text-white">
            <tr>
              {[
                "Name",
                "Mobile",
                "Email",
                "PAN",
                "Aadhar",
                "Address",
                "City",
                "State",
                "Project",
                "Location",
                "Property Type",
                "Plot Size",
                "Unit/Plot No",
                "Area",
                "Rate",
                "Total Value",
                "Advance",
                "Remaining",
                "Amount Paid",
                "Transaction ID",
                "Payment Status",
                "Actions",
              ].map((h) => (
                <th key={h} className="p-3 text-left whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => {
              const status = b.payment_status || "pending";
              return (
                <tr key={b.id} className="border-b hover:bg-gray-50 text-black">
                  <td className="p-3 font-medium">{b.full_name}</td>
                  <td className="p-3">{b.mobile_number}</td>
                  <td className="p-3">{b.email}</td>
                  <td className="p-3">{b.pan}</td>
                  <td className="p-3">{b.aadhar}</td>
                  <td className="p-3">{b.address}</td>
                  <td className="p-3">{b.city}</td>
                  <td className="p-3">{b.state}</td>
                  <td className="p-3">{b.project_name}</td>
                  <td className="p-3">{b.project_location}</td>
                  <td className="p-3">{b.property_type}</td>
                  <td className="p-3">{b.plot_size}</td>
                  <td className="p-3">{b.unit_plot_number}</td>
                  <td className="p-3">{b.area}</td>
                  <td className="p-3">{b.rate_per_sq_ft}</td>
                  <td className="p-3">₹{b.total_property_value}</td>
                  <td className="p-3">₹{b.token_advance}</td>
                  <td className="p-3">₹{b.remaining_balance}</td>
                  <td className="p-3">₹{b.amount_paid || "-"}</td>
                  <td className="p-3">{b.transaction_id || "-"}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold ${
                        STATUS_STYLE[status]
                      }`}
                    >
                      {status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-3 space-x-2 whitespace-nowrap">
                    {["pending", "success", "failure"].map((s) => (
                      <button
                        key={s}
                        disabled={actionId === b.id}
                        onClick={() => updateStatus(b.id, s)}
                        className="px-3 py-1 border rounded text-xs hover:bg-gray-100"
                      >
                        {s}
                      </button>
                    ))}

                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="px-3 py-1 border rounded text-xs text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
