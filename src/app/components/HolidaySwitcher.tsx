
'use client';

import React, { useState } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { holidays } from '@/lib/holidays';

interface HolidaySwitcherProps {
  onHolidayChange: (holidayName: string) => void;
}

const HolidaySwitcher: React.FC<HolidaySwitcherProps> = ({ onHolidayChange }) => {
  const [selectedHoliday, setSelectedHoliday] = useState<string>('auto');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const holidayName = event.target.value;
    setSelectedHoliday(holidayName);
    onHolidayChange(holidayName);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={selectedHoliday}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="auto">
          <em>Auto</em>
        </MenuItem>
        {holidays.map(holiday => (
          <MenuItem key={holiday.name} value={holiday.name}>
            {holiday.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default HolidaySwitcher;
