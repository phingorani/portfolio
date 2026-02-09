'use client';

import React, { useEffect, useState } from 'react';
import { holidays, Holiday } from '@/lib/holidays';
import SnowEffect from './holiday-effects/SnowEffect';
import FireworksEffect from './holiday-effects/FireworksEffect';
import HeartsEffect from './holiday-effects/HeartsEffect';
import FallingLeavesEffect from './holiday-effects/FallingLeavesEffect';

const holidayEffects: { [key: string]: React.FC } = {
  Christmas: SnowEffect,
  'Independence Day': FireworksEffect,
  'Valentine\'s Day': HeartsEffect,
  Thanksgiving: FallingLeavesEffect,
};

const isHolidayToday = (currentDate: Date): Holiday | null => {
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return holidays.find(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate.getMonth() === currentMonth && holidayDate.getDate() === currentDay;
  }) || null;
};

interface HolidayProviderProps {
  override?: string;
}

const HolidayProvider: React.FC<HolidayProviderProps> = ({ override }) => {
  const [holiday, setHoliday] = useState<Holiday | null>(null);

  useEffect(() => {
    if (override && override !== 'auto') {
      const selectedHoliday = holidays.find(h => h.name === override);
      setHoliday(selectedHoliday || null);
    } else {
      const today = new Date();
      const currentHoliday = isHolidayToday(today);
      setHoliday(currentHoliday);
    }
  }, [override]);

  if (!holiday) {
    return null;
  }

  const HolidayEffect = holidayEffects[holiday.name];

  return HolidayEffect ? <HolidayEffect /> : null;
};

export default HolidayProvider;
