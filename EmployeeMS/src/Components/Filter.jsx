import React, { useState } from 'react';
import axios from 'axios';

function Filter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/auth/filter/${searchTerm}/${minSalary}/${maxSalary}`);
            setSearchResults(response.data.Result);
            console.log(response.data.Result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (

        <div className="d-flex justify-content-center align-items-center h-75">
            <div className="p-3 rounded w-25 border">
                <h1>Search Filter</h1>
                <form onSubmit={handleSearch}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name:</strong>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="minSalary">
                            <strong>Min Salary:</strong>
                        </label>
                        <input
                            type="number"
                            name="minSalary"
                            placeholder='Enter min salary'
                            value={minSalary}
                            onChange={(e) => setMinSalary(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="maxSalary">
                            <strong>Max Salary:</strong>
                        </label>
                        <input
                            type="number"
                            name="maxSalary"
                            placeholder='Enter max salary'
                            value={maxSalary}
                            onChange={(e) => setMaxSalary(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success w-100 rounded-0 mb-2">Search</button>
                </form>
            </div>

            <div>
                {searchResults.map((item) => (
                    <ul key={item.id}>
                        <li><b><i>Id: </i></b>{item.id}</li>
                        <li><b><i>Name: </i></b>{item.name}</li>
                        <li><b><i>Email: </i></b>{item.email}</li>
                        <li><b><i>Salary: </i></b>{item.salary}</li>
                    </ul>
                ))}
            </div>

        </div>
    );
}

export default Filter;
