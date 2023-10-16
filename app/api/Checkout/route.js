import { NextResponse } from "next/server";
const midtransClient = require("midtrans-client");
export async function POST(request) {
  const { total } = await request.json();
  console.log(total);
  // Create Snap API instance
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: "SB-Mid-server-6vGGkCSCpjh6LaAkIoOvMvI9",
  });

  let parameter = {
    transaction_details: {
      order_id: "YOUR-ORDERID-123456",
      gross_amount: total,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
  };

  let coba = await snap.createTransaction(parameter).then((transaction) => {
    // transaction redirect_url
    let redirectUrl = transaction.redirect_url;
    console.log("redirectUrl:", redirectUrl);
    return redirectUrl;
  });

  return NextResponse.json({ coba });
}
