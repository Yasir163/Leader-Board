import React, { useState } from 'react'
import group from '../assets/group.svg';
import '../components/leaderboard.css';
import trophy from '../assets/trophy.svg';
import '../App.css'

function Leaderboard() {
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [recentEntry, setRecentEntry] = useState(null);

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'key') setKey(value);
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setValue(value);
        }
    };

    const handleAddData = () => {
        if (!key || !value) {
            setError('Both fields are required');
            return;
        }
        setData(prevData => ({
            ...prevData,
            [key]: parseInt(value, 10) // Convert value to integer
        }));
        // Clear inputs
        setRecentEntry({ key, value: parseInt(value, 10) });
        setKey('');
        setValue('');
    };
    const getClassName = (index) => {
        if (index === 0) return 'first';
        if (index === 1) return 'second';
        if (index === 2) return 'third';
        return '';
    };
    return (
        <div>
            <div className='nav'>
                <div className='container nav-container'>
                    <div className='nav-text'>
                        <h1>Gilly's</h1>
                        <h4>Kormangala</h4>
                    </div>
                    <div>
                        <img className='nav-img' src={group} alt="" />
                    </div>
                </div>
            </div>
            <div className='details'>
                <div className='enter-details'>
                    <h1 className='data-heading'>Enter Data</h1>
                    <div className='input-details'>
                        <input
                            className='name-input'
                            name="key"
                            placeholder="Your Name"
                            value={key}
                            type='text'
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="value"
                            placeholder="Timing"
                            value={value}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="input-button" onClick={handleAddData}>Add Entry</button>
                </div>


                <div>
                    <div className='card'>
                        <div className='container card-container-header'>
                            <div className='header-trophy'>
                                <div><img className='trophy' src={trophy} alt="" /></div>
                                <div className='name-heading'>Name</div>
                            </div>
                            <div className='time-heading'>Time (minutes)</div>
                        </div>
                    </div>
                    {Object.entries(data).
                        sort((a, b) => a[1] - b[1]).
                        splice(0, 5)
                        .map(([key, value], index) => (
                            <div className='card'>
                                <div className={`container card-container ${getClassName(index)}`}>
                                    <div className='header-trophy'>
                                        <div className='serial-number'>{index + 1}</div>
                                        <div className='name'>
                                            {key.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className='timing'>
                                        {value} minutes
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {recentEntry && (
                <div>
                    <h2>Most Recent Entry:</h2>
                    <div className='card'>
                        <div className='container card-container recent-entry'>
                            <div className='name'>{recentEntry.key.toUpperCase()}</div>
                            <div className='timing'>{recentEntry.value} MINUTES</div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            <div className='lower-part'></div>

        </div>
    )
}

export default Leaderboard
