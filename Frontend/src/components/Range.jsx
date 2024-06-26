//Time Range compnent to filter appointments by dat and time

import React, { useState } from "react";

const Range = ({ appointChange }) => {
    const [begin, setBegin] = useState('');
    const [finish, setFinish] = useState('');

    const handleChange = () => {
        appointChange(new Date(begin), new Date(finish));
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="begin">
                    Start Date & Time
                </label>
                <input
                    id="begin"
                    type="datetime-local"
                    value={begin}
                    onChange={e => setBegin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="finish">
                    End Date & Time
                </label>
                <input
                    id="finish"
                    type="datetime-local"
                    value={finish}
                    onChange={e => setFinish(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <button
                onClick={handleChange}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Filter
            </button>
        </div>
    );
};

export default Range;
