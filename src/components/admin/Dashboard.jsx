import React, { useState } from 'react'
import Calendar from 'react-calendar'
import PieChart from '../UI/PieChart';
import BarChart from '../UI/BarChart';
import Donut from '../UI/DonutChart';
import LineChart from '../UI/LineChart';
export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const onChange = newDate => {
        setDate(newDate);
    };
    const pieData = {
        labels: ["connectedAlumnis", "unconnectedAlumnis"],
        datasets: [
            {
                label: "Alumni Connection Status",
                data: [90, 10],
                backgroundColor: ["#38bdf8", "#0284c7"],
            },
        ],

    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>
                Admin Dashboard
            </h1>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4'>

                <div className='bg-blue-100 p-6 rounded-lg shadow-md border border-white hover:border-blue-700 transition transform hover:-translate-y-2'>
                    <h2 className='text-xl text-center font-semibold mb-4'>New Requests</h2>
                    <p className='text-3xl text-center font-bold'>12</p>
                </div>

                <div className='bg-blue-300 p-6 rounded-lg shadow-md border border-white hover:border-blue-700 transition transform hover:-translate-y-2'>
                    <h2 className='text-xl font-semibold text-center mb-4'>Active Students</h2>
                    <p className='text-3xl text-center font-bold'>100</p>
                </div>

                <div className='bg-blue-100 p-6 rounded-lg shadow-md border border-white hover:border-blue-700 transition transform hover:-translate-y-2'>
                    <h2 className='text-xl text-center font-semibold mb-4'>Active Alumnis</h2>
                    <p className="text-3xl text-center font-bold">100</p>
                </div>

                <div className='bg-blue-300 p-6 rounded-lg shadow-md border border-white hover:border-blue-700 transition transform hover:-translate-y-2'>
                    <h2 className='text-xl font-semibold mb-4 text-center'>Total Job Posts</h2>
                    <p className='text-3xl font-bold text-center'>4</p>
                </div>

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                {/* Calendar */}
                <div className="bg-blue-100 p-4 rounded-xl shadow-md">
                    <Calendar onChange={onChange} value={date} />
                </div>

                {/* Line Chart */}
                <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:border-gray-400 transition transform hover:-translate-y-2">
                    <h2 className="text-lg font-semibold text-center mb-2 text-gray-700">
                        Internships Growth
                    </h2>
                    <div className="h-[200px]">
                        <LineChart />
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-gray-400 transition transform hover:-translate-y-2">
                    <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
                        Student Domain Interest
                    </h2>
                    <div className="h-[250px]">
                        <BarChart />
                    </div>
                </div>

                {/* Donut Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-gray-400 transition transform hover:-translate-y-2">
                    <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
                        Alumni's Working Domain
                    </h2>
                    <div className="h-[250px] flex items-center justify-center">
                        <Donut />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-gray-400 transition transform hover:-translate-y-2 md:col-span-2">
                    <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">
                        Alumni Status
                    </h2>
                    <div className="h-[250px] flex items-center justify-center">
                        <PieChart data={pieData} />
                    </div>
                </div>

            </div>

        </div>
    )
};