import mongoose from "mongoose";
let Schema = mongoose.Schema;

const BarangSchema = new Schema(
  {
    Namabarang: { type: String, required: true },
    Hargabarang: { type: Number, required: true },
    Stockbarang: { type: Number, required: true },
    Deskripsibarang: { type: String, required: true },
    Gambarbarang: { type: String, required: true },
    Status: { type: String, required: true },
  },
  { timestamps: true }
);

let Barang;

if (mongoose.models.Barang) {
  Barang = mongoose.model("Barang");
} else {
  Barang = mongoose.model("Barang", BarangSchema);
}
export default Barang;
