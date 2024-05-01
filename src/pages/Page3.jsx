import React, { useState, useEffect } from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

export default function Page3() {
    const [salesData, setSalesData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('annual'); // Default to show annual data
    const [selectedYear, setSelectedYear] = useState(null);
    const [monthlySalesData, setMonthlySalesData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/annual-sales')
            .then(response => response.json())
            .then(data => {
                // Sort the data by year
                data.sort((a, b) => a.year - b.year);
                setSalesData(data);
            })
            .catch(error => console.error('Error fetching annual sales data:', error));
    }, []);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'monthly') {
            // Set default selected year to the first year in sales data
            setSelectedYear(salesData.length > 0 ? salesData[0].year : null);
        }
    };

    useEffect(() => {
        if (selectedYear) {
            fetch(`http://localhost:4000/monthly-sales/${selectedYear}`)
                .then(response => response.json())
                .then(data => {
                    // Sort the data by month
                    data.sort((a, b) => a.month - b.month);
                    setMonthlySalesData(data);
                })
                .catch(error => console.error(`Error fetching monthly sales data for year ${selectedYear}:`, error));
        }
    }, [selectedYear]);

    const renderChartData = () => {
        if (selectedOption === 'annual') {
            return {
                xAxis: [{
                    id: 'Years',
                    data: salesData.map(data => data.year),
                    scaleType: 'band',
                }],
                series: [{
                    id: 'Sales',
                    data: salesData.map(data => parseInt(data.totalSales)),
                    stack: 'total',
                    area: true,
                    showMark: false,
                }]
            };
        } else if (selectedOption === 'monthly') {
            return {
                xAxis: [{
                    id: 'Months',
                    data: monthlySalesData.map(data => data.month),
                    scaleType: 'band',
                }],
                series: [{
                    id: 'Sales',
                    data: monthlySalesData.map(data => parseInt(data.totalSales)),
                    stack: 'total',
                    area: true,
                    showMark: false,
                }]
            };
        }
    };

    return (
        <div>
            <select value={selectedOption} onChange={handleDropdownChange}>
                <option value="annual">Annual Sales</option>
                <option value="monthly">Monthly Sales</option>
            </select>
            {selectedOption === 'monthly' && (
                <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
                    {salesData.map((data) => (
                        <option key={data.year} value={data.year}>{data.year}</option>
                    ))}
                </select>
            )}
            <LineChart
                sx={{
                    [`& .${lineElementClasses.root}`]: {
                        strokeDasharray: '10 5',
                        strokeWidth: 4,
                    },
                }}
                xAxis={renderChartData().xAxis}
                series={renderChartData().series}
                margin={{ left: 60, top: 10, right: 20 }}
                width={600}
                height={300}
            />
        </div>
    );
}
