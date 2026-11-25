import { mkdirSync, writeFileSync } from "node:fs";

// Potongan kalimat disimpan sebagai peta berlabel, bukan satu string utuh.
const potongan: Record<string, string> = {
  pembuka: "I can make my shadow",
  besaran: "10% darker,",
  penghubung: "but only on",
  kondisi: "cloudy days.",
};

// Urutan penyusunan ditentukan oleh daftar kunci, bukan urutan literal.
const urutanKunci = ["pembuka", "besaran", "penghubung", "kondisi"];

// Merangkai potongan menjadi satu baris, lalu memastikan lolos gate:
// 1-140 karakter, satu baris, bukan hanya spasi.
function rangkaiSatuBaris(bagian: string[]): string {
  const gabung = bagian.join(" ").replace(/\s+/g, " ").trim();
  if (gabung.length < 1 || gabung.length > 140) {
    throw new Error(`panjang kalimat ${gabung.length} di luar 1-140 karakter`);
  }
  if (gabung.includes("\n")) {
    throw new Error("kalimat harus satu baris");
  }
  return gabung;
}

const kalimat = rangkaiSatuBaris(urutanKunci.map((kunci) => potongan[kunci]));

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", kalimat, "utf8");
