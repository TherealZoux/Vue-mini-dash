<template>
    <div class="w-full h-full max-w-lg mx-auto">
      <PolarArea :data="chartData" :lables="chartOptions" />
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
  } from "chart.js";
  import { PolarArea } from "vue-chartjs";
  import { computed, defineProps } from "vue";
  
  ChartJS.register(RadialLinearScale, ArcElement, Title, Tooltip, Legend);
  
  const props = defineProps<{
    labels: string[];
    values: number[];
    title?: string;
  }>();
  
  const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
      {
        label: props.title || "",
        data: props.values,
        backgroundColor: props.labels.map((_, idx) =>
          `rgba(${50 + idx * 40}, ${100 + idx * 30}, ${150 + idx * 20}, 0.6)`
        ),
        borderWidth: 1,
      },
    ],
  }));
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      title: {
        display: !!props.title,
        text: props.title,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.formattedValue}`;
          },
        },
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };
  </script>
  