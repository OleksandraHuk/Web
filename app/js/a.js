window.onload = function () {
    const tl_btn = document.getElementById("tl_btn");
    const euro_btn = document.getElementById("euro_btn");
    const usd_btn = document.getElementById("usd_btn");

    let purpleGraph = null;

    createChart("./json/purpleGraphTL.json");

    function fetchData(filePath, callback) {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(callback)
            .catch((error) => {
                throw new Error('There has been a problem with your fetch operation:', error);
            });
    }

    function createChart(filePath) {
        fetchData(filePath, (response) => {
            const config = {
                type: 'line',
                data: {
                    labels: response.labels,
                    datasets: response.datasets,
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false,
                    },
                    scales: {
                        x: {
                            title: {
                                display: false,
                            },
                            display: false,
                        },
                        y: {
                            stacked: true,
                            title: {
                                display: false,
                            },
                            display: false,
                            min: 0,
                            max: 200,
                        },
                    },
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: true,
                        callbacks: {
                            title: function () {
                                return '';
                            },
                            label: function (tooltipItem) {
                                return labels[tooltipItem.index];
                            },
                        },
                    },
                },
            };

            if (purpleGraph) {
                purpleGraph.destroy();
            }

            purpleGraph = new Chart(document.getElementById('purpleGraph').getContext('2d'), config);
        });
    }

    tl_btn.addEventListener("click", () => {
        createChart("./json/purpleGraphTL.json");
    });

    euro_btn.addEventListener("click", () => {
        createChart("./json/purpleGraphEuro.json");
    });

    usd_btn.addEventListener("click", () => {
        createChart("./json/purpleGraphUsd.json");
    });
};
