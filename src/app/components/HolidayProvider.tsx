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

const getNextHoliday = (currentDate: Date): Holiday | null => {
  const currentYear = currentDate.getFullYear();

  const upcomingHolidays = holidays
    .map(holiday => {
      const holidayDate = new Date(holiday.date);
      holidayDate.setFullYear(currentYear);
      if (holidayDate < currentDate) {
        holidayDate.setFullYear(currentYear + 1);
      }
      return { ...holiday, date: holidayDate };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return upcomingHolidays[0] || null;
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
      const nextHoliday = getNextHoliday(today);
      setHoliday(nextHoliday);
    }
  }, [override]);

  if (!holiday) {
    return null;
  }

  const HolidayEffect = holidayEffects[holiday.name];

  return HolidayEffect ? <HolidayEffect /> : null;
};

export default HolidayProvider;
