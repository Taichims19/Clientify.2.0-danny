"use client";

import { BorderColor } from "@mui/icons-material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutGraphic() {
  const data = {
    labels: ["Anual", "Mensual"],
    datasets: [
      {
        label: "Recurrencia",
        data: [80, 20],
        backgroundColor: ["#0067EE", "#C4E4FF"], // Colores de las secciones
        borderWidth: 0, // Sin borde para un look limpio
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Ajuste del tamaño del recorte interior
    circumference: 180, // Semicírculo
    rotation: 270, // Rotación para comenzar desde la parte superior
    plugins: {
      legend: {
        display: false, // Oculta la leyenda ya que se muestra en el componente padre
      },
      tooltip: {
        enabled: false, // Desactiva el tooltip para un estilo más limpio
      },
    },
  };

  return (
    <Box width={200} height={100}>
      {" "}
      {/* Ajuste de tamaño para coincidir */}
      <Doughnut data={data} options={options} />
    </Box>
  );
}
