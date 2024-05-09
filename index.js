const express = require("express");


const app = express();
const port = process.env.PORT || 3000;


// Middleware


// Dummy data
let products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
];
const regulations = [
  {
    id_data_peraturan: 1,
    nama: "Peraturan Pemerintah",
    singkatan: "PP",
    jumlah: 100,
  },
  { id_data_peraturan: 2, nama: "Undang-Undang", singkatan: "UU", jumlah: 150 },
  {
    id_data_peraturan: 3,
    nama: "Keputusan Presiden",
    singkatan: "KEPPRES",
    jumlah: 70,
  },
  {
    id_data_peraturan: 4,
    nama: "Peraturan Menteri",
    singkatan: "PERMEN",
    jumlah: 200,
  },
  {
    id_data_peraturan: 5,
    nama: "Peraturan Daerah",
    singkatan: "PERDA",
    jumlah: 120,
  },
  {
    id_data_peraturan: 6,
    nama: "Instruksi Presiden",
    singkatan: "INPRES",
    jumlah: 30,
  },
  {
    id_data_peraturan: 7,
    nama: "Instruksi Menteri",
    singkatan: "INMEN",
    jumlah: 50,
  },
  { id_data_peraturan: 8, nama: "Surat Edaran", singkatan: "SE", jumlah: 80 },
  {
    id_data_peraturan: 9,
    nama: "Keputusan Menteri",
    singkatan: "KEPMEN",
    jumlah: 90,
  },
  {
    id_data_peraturan: 10,
    nama: "Surat Keputusan",
    singkatan: "SK",
    jumlah: 110,
  },
];

const regulationsData = [];

for (let i = 1; i <= 100; i++) {
  const randomRegulation =
    regulations[Math.floor(Math.random() * regulations.length)];

  let peraturanId = null;
  if (randomRegulation.tingkat_lanjut === "Baru") {
    peraturanId = null; // Jika tingkat lanjut adalah "Baru", peraturan_id akan null
  } else {
    peraturanId = Math.floor(Math.random() * 5) + 1; // Jika tidak, peraturan_id akan diambil dari nilai acak antara 1 hingga 5
  }

  const data = {
    id_peraturan: i,
    nomor: Math.floor(Math.random() * 1000) + 1,
    tahun: Math.floor(Math.random() * 30) + 1990,
    tentang: `Tentang ${randomRegulation.nama}`,
    teu: `Teu dari ${randomRegulation.nama}`,
    abstrak: `Abstrak dari ${randomRegulation.nama}`,
    slug: `slug-${i}`,
    tanggal_pengundangan: `${Math.floor(Math.random() * 28) + 1}-${
      Math.floor(Math.random() * 12) + 1
    }-${Math.floor(Math.random() * 20) + 2000}`,
    tanggal_penetapan: `${Math.floor(Math.random() * 28) + 1}-${
      Math.floor(Math.random() * 12) + 1
    }-${Math.floor(Math.random() * 20) + 2000}`,
    tanggal_berlaku: `${Math.floor(Math.random() * 28) + 1}-${
      Math.floor(Math.random() * 12) + 1
    }-${Math.floor(Math.random() * 20) + 2000}`,
    tempat_penerbitan: `Tempat penerbitan ${randomRegulation.nama}`,
    penerbit: `Penerbit ${randomRegulation.nama}`,
    lokasi_penerbit: `Lokasi penerbit ${randomRegulation.nama}`,
    status: Math.random() < 0.5 ? "Berlaku" : "Tidak berlaku",
    tingkat_lanjut: Math.random() < 0.5 ? "Baru" : "Pembaruan",
    peraturan_id: peraturanId,
    data_peraturan_id : randomRegulation.id_data_peraturan,
    bidang: `Bidang ${randomRegulation.nama}`,
    sumber: `Sumber ${randomRegulation.nama}`,
  };

  regulationsData.push(data);
}


app.get("/", (req, res) => {
    console.log(req.path);
  return res.send("ini api");
});
app.get("/tes", (req, res) => {
  return res.send("ini tes");
});

app.get("/data-peraturan", (req, res) => {
  res.json(regulations);
});

app.get("/data-peraturan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const regulationsDataById = regulationsData.filter(
    (data) => data.data_peraturan_id === id
  );
  if (regulationsDataById.length === 0) {
    res.status(404).send("Data not found for the provided regulation ID");
    return;
  }

  // Transformasi data untuk hanya menampilkan properti yang diminta
  const simplifiedData = regulationsDataById.map((data) => ({
    id_peraturan: data.id_peraturan,
    slug: data.slug,
    tentang: data.tentang,
    nomor: data.nomor,
    tahun: data.tahun,
    status: data.status,
    data_peraturan_id: {
      nama: regulations.find(
        (reg) => reg.id_data_peraturan === data.data_peraturan_id
      )?.nama,
      singkatan: regulations.find(
        (reg) => reg.id_data_peraturan === data.data_peraturan_id
      )?.singkatan,
    },
  }));

  res.json(simplifiedData);
});

app.get("/peraturan/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const regulationData = regulationsData.find((reg) => reg.id_peraturan === id);
  if (!regulationData) {
    res.status(404).send("Peraturan not found");
    return;
  }
  res.json(regulationData);
});

// Routes
// Get all products
app.get("/products", (req, res) => {
  res.json(products);
});

// Get product by id
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((prod) => prod.id === id);
  if (!product) {
    res.status(404).send("Product not found");
    return;
  }
  res.json(product);
});

// // Add new product
// app.post("/products", (req, res) => {
//   const { name, price } = req.body;
//   const id = products.length + 1;
//   const newProduct = { id, name, price };
//   products.push(newProduct);
//   res.status(201).json(newProduct);
// });

// // Update product
// app.put("/products/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name, price } = req.body;
//   const index = products.findIndex((prod) => prod.id === id);
//   if (index === -1) {
//     res.status(404).send("Product not found");
//     return;
//   }
//   products[index] = { id, name, price };
//   res.json(products[index]);
// });

// // Delete product
// app.delete("/products/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = products.findIndex((prod) => prod.id === id);
//   if (index === -1) {
//     res.status(404).send("Product not found");
//     return;
//   }
//   products.splice(index, 1);
//   res.sendStatus(204);
// });

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
