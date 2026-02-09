'use client';

import React from 'react';
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

const HolidayProvider: React.FC = () => {
  const today = new Date();
  const currentHoliday = isHolidayToday(today);

  if (!currentHoliday) {
    return null;
  }

  const HolidayEffect = holidayEffects[currentHoliday.name];

  return HolidayEffect ? <HolidayEffect /> : null;
};

export default HolidayProvider;
