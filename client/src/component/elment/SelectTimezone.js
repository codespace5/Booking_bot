import React, {useState, useEffect} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';

const SelectTimezone = () => {
    const [age, setAge] = React.useState('');
    const [timeZone, setTimeZone] = useState('');

    const timezones = [
        { value: 0, label: 'Eastern Daylight Time (EDT)', timeZone: 'America/New_York' },
        { value: 10, label: 'America/Jamaica (EST)', timeZone: 'America/Jamaica' },
        { value: 20, label: 'America/Chicago (CST / CDT)', timeZone: 'America/Chicago' },
        { value: 30, label: 'America/Denver (MST / MDT)', timeZone: 'America/Denver' },
        { value: 40, label: 'Europe/Berlin (CET/CEST)', timeZone: 'Europe/Berlin' },
        { value: 50, label: 'America/Los_Angeles (PST / PDT)', timeZone: 'America/Los_Angeles' }
    ];

    useEffect(() => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setTimeZone(timeZone);
        const matchedTimezone = timezones.find(zone => zone.timeZone === timeZone);
        if (matchedTimezone) {
            setAge(matchedTimezone.value.toString());
        }
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className="select-timezone">
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        {timezones.map(timezone => (
                            <MenuItem key={timezone.value} value={timezone.value}>
                                {timezone.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
};


export default SelectTimezone;
