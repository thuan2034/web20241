export type JLPT = (typeof jlpt)[number];

const jlpt = [
  { name: "N1" },
  { name: "N2" }, // Đã sửa nativeName
  { name: "N3"}, // Đã sửa nativeName
  { name: "N4"}, // Đã sửa nativeName
  { name: "N5"}, // Đã sửa nativeName
] as const;

export default jlpt;
