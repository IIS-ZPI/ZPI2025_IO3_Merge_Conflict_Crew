import React from 'react';
import { calculateSessions } from '../../utils/calculations';

const StatCard = ({ icon, value, label, type }) => {
  const isUp = type === 'up';
  const isDown = type === 'down';
  
  const iconBg = isUp ? 'bg-status-green/10' : isDown ? 'bg-status-red/10' : 'bg-text-muted/10';
  const iconColor = isUp ? 'text-status-green' : isDown ? 'text-status-red' : 'text-text-muted';
  const valueColor = isUp ? 'text-status-green' : isDown ? 'text-status-red' : 'text-text-main';

  return (
    <div className="p-4 rounded-[10px] border border-border bg-card-inner flex flex-col justify-between h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg} ${iconColor}`}>
          <i className="material-icons text-2xl">{icon}</i>
        </div>
        <span className={`text-[1.7rem] font-bold ${valueColor} leading-none`}>{value}</span>
      </div>
      <span className="text-[0.85rem] text-text-muted font-medium pl-1">{label}</span>
    </div>
  );
};

const SessionSummary = ({ rates = [] }) => {
  const { growth, decline, noChange } = calculateSessions(rates);

  return (
    <div className="flex flex-col h-full">
      <div className="section-title">
        <i className="material-icons mr-2 text-[1.1rem]">calendar_today</i> 
        Session Summary
      </div>
      <div className="section-box flex-1 flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-[15px] w-full">
          <StatCard icon="arrow_upward" value={growth} label="Growth" type="up" />
          <StatCard icon="arrow_downward" value={decline} label="Decline" type="down" />
          <StatCard icon="remove" value={noChange} label="No Change" type="unchanged" />
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
