// Load .env.local explicitly (DO NOT REMOVE THIS)
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

// HARD FAIL if env is missing (this saves hours of debugging)
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  console.error("❌ ENV NOT LOADED");
  console.error("Check .env.local location and keys");
  process.exit(1);
}

// Create Supabase client using SERVICE ROLE KEY (server-only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runTest() {
  console.log("🚀 Starting Supabase Booking Test...\n");

  // 1️⃣ INSERT BOOKING
  const bookingPayload = {
    full_name: "Test User",
    father_husband_name: "Test Father",
    mobile_number: "9999999999",
    email: "test@example.com",
    pan: "ABCDE1234F",
    aadhar: "123412341234",
    address: "Test Address",
    city: "Kolkata",
    state: "West Bengal",

    project_name: "MEGA CITY KOLKATA",
    project_location: "Salt Lake",
    property_type: "Plot",
    plot_size: "1000 SQ FT",
    unit_plot_number: "U-101",
    plot_no: "P-45",
    area: 1000,
    rate_per_sq_ft: 1500,

    payment_option: "one-time",
    emi_tenure: null,
    total_property_value: 1500000,
    token_advance: 100000,
    remaining_balance: 1400000,

    terms_accepted: true,
  };

  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert(bookingPayload)
    .select()
    .single();

  if (insertError) {
    console.error("❌ INSERT FAILED");
    console.error(insertError);
    process.exit(1);
  }

  console.log("✅ Booking inserted");
  console.log("🆔 Booking ID:", booking.id, "\n");

  // 2️⃣ UPDATE PAYMENT
  const { error: updateError } = await supabase
    .from("bookings")
    .update({
      amount_paid: 100000,
      transaction_id: "TESTUTR123456",
      payment_method: "google_pay",
      payment_status: "success",
    })
    .eq("id", booking.id);

  if (updateError) {
    console.error("❌ PAYMENT UPDATE FAILED");
    console.error(updateError);
    process.exit(1);
  }

  console.log("✅ Payment updated\n");

  // 3️⃣ FETCH & VERIFY
  const { data: updatedBooking, error: fetchError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", booking.id)
    .single();

  if (fetchError) {
    console.error("❌ FETCH FAILED");
    console.error(fetchError);
    process.exit(1);
  }

  console.log("📦 FINAL RECORD");
  console.table({
    id: updatedBooking.id,
    name: updatedBooking.full_name,
    total_value: updatedBooking.total_property_value,
    amount_paid: updatedBooking.amount_paid,
    payment_status: updatedBooking.payment_status,
  });

  // 4️⃣ ASSERTION
  if (updatedBooking.payment_status !== "success") {
    console.error("❌ TEST FAILED: payment_status not updated");
    process.exit(1);
  }

  console.log("\n🎉 ALL TESTS PASSED");
  process.exit(0);
}

runTest();
