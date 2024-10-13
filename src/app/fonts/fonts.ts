import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Importamos todos los pesos necesarios
});

// export const lusitana = Lusitana({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });
// className={`${styles["H1-bold"]} ${poppins.className}`}
