// Fetch data and create chart
fetch("/inventory/chart-data")
  .then((response) => response.json())
  .then((data) => {
    const ctx = document.getElementById("inventoryChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: "Cantidad de productos",
            data: data.map((item) => item.count),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.label + ": " + tooltipItem.raw;
              },
            },
          },
        },
      },
    });
  });
