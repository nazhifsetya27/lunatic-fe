import React, { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
const MyChartPieDonut = ({
    values = [],
    colors = [],
    labels = [],
    height = 300,
    type = "pie" // pie & donut
}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (values && values.length) {
            const _values = values.map((e) => parseInt(e) || 0);

            const total = _values.reduce((a, b) => a + b, 0);
            const series = _values.map((e) => {
                if (total !== 0) return (e / total) * 100;
                return 0;
            });

            setChartData({ total: total, values: _values, series: series })
        } else {
            setChartData({ total: 0, values: [], series: [] })
        }
    }, [values])

    const options = useMemo(() => {
        return {
            stroke: { width: 0 },
            values: chartData?.values ?? [],
            colors: colors,
            labels: labels,
            legend: {
                horizontalAlign: "left",
                // floating: true
                // offsetX: 15,
                // offsetY: -15,
                fontFamily: 'Inter',
                color: '#475467'
            },
            tooltip: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                offsetY: -15
                            },
                            value: {
                                fontSize: '36px',
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                color: '#101828',
                                offsetY: 5,
                                formatter: function (val, w) {
                                    var idx = (w.config.series ?? []).findIndex((e) => e.toString() === val.toString());
                                    if (idx !== -1) return w.config.values[idx].toLocaleString();

                                    return "-";
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: 500,
                                color: '#475467',
                                formatter: (w) => {
                                    return w.config.values.reduce((a, b) => a + b, 0).toLocaleString()
                                },
                            }
                        }
                    }
                },
            },
            dataLabels: {
                enabled: false
            }
        };
    }, [chartData?.values, colors, labels])

    return (
        <>
            <ReactApexChart
                type={type}
                // height={height}
                width={"100%"}
                options={options}
                series={chartData?.series ?? []}
            />
        </>
    );
};

export default MyChartPieDonut;
