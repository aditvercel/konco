import { connectToDB } from "@/utils/ConnectDB";
import Barang from "@/model/Barang";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectToDB();
  try {
    let cari = await Barang.find({});
    console.log(cari);
    return NextResponse.json(cari);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: error._message }, { status: 500 });
  }
  return Response.json({ hi: "GET" });
}

export async function POST(request) {
  await connectToDB();
  try {
    const res = await request.json();
    console.log(res);
    let baru = new Barang(res);
    await baru.save();
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: error._message }, { status: 400 });
  }
}

export async function PATCH(request) {
  await connectToDB(); // Ensure you've connected to the database

  try {
    const res = await request.json();
    const { id, Namabarang, Hargabarang, Stockbarang, Deskripsibarang } = res;
    console.log("ini adalah res nya ", res);

    const update = { Namabarang, Hargabarang, Stockbarang, Deskripsibarang };

    // Find the document by its _id and update it
    const updatedCharacter = await Barang.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!updatedCharacter) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedCharacter);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
