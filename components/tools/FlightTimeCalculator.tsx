"use client";

import { useState } from "react";
import { Battery, Clock, Zap, Weight } from "lucide-react";

const EFFICIENCY = 0.8; // 80% real-world efficiency factor

const PRESETS = [
  { label: "5\" FPV Quad", capacity: 1500, voltage: 14.8, weight: 680, power: 280 },
  { label: "DJI Mini Style", capacity: 2400, voltage: 7.7, weight: 249, power: 35 },
  { label: "7\" Long Range", capacity: 3000, voltage: 22.2, weight: 1200, power: 200 },
  { label: "Agriculture Hex", capacity: 16000, voltage: 44.4, weight: 25000, power: 1800 },
];

function calcFlightTime(capacity: number, voltage: number, power: number) {
  if (power <= 0) return 0;
  const energyWh = (capacity * voltage) / 1000;
  return (energyWh / power) * 60 * EFFICIENCY;
}

export function FlightTimeCalculator() {
  const [capacity, setCapacity] = useState(1500);
  const [voltage, setVoltage] = useState(14.8);
  const [weight, setWeight] = useState(680);
  const [power, setPower] = useState(280);

  const flightMinutes = calcFlightTime(capacity, voltage, power);
  const energyWh = (capacity * voltage) / 1000;
  const minutes = Math.floor(flightMinutes);
  const seconds = Math.round((flightMinutes - minutes) * 60);

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setCapacity(preset.capacity);
    setVoltage(preset.voltage);
    setWeight(preset.weight);
    setPower(preset.power);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      {/* Input Panel */}
      <div className="border border-border-subtle p-8 space-y-8">
        {/* Presets */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 block">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => applyPreset(preset)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider border border-border-subtle hover:border-accent hover:text-accent transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="Battery Capacity"
            unit="mAh"
            value={capacity}
            onChange={setCapacity}
            icon={<Battery size={16} />}
            min={100}
            max={50000}
            step={100}
          />
          <InputField
            label="Battery Voltage"
            unit="V"
            value={voltage}
            onChange={setVoltage}
            icon={<Zap size={16} />}
            min={3.7}
            max={60}
            step={0.1}
          />
          <InputField
            label="All-Up Weight"
            unit="g"
            value={weight}
            onChange={setWeight}
            icon={<Weight size={16} />}
            min={50}
            max={50000}
            step={10}
          />
          <InputField
            label="Avg Power Draw"
            unit="W"
            value={power}
            onChange={setPower}
            icon={<Zap size={16} />}
            min={1}
            max={10000}
            step={5}
          />
        </div>
      </div>

      {/* Results Panel */}
      <div className="border border-accent p-8 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-6">
            Estimated Flight Time
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl font-bold font-heading tracking-tight">
              {minutes}
            </span>
            <span className="text-xl text-text-muted font-heading">min</span>
            <span className="text-4xl font-bold font-heading tracking-tight ml-2">
              {seconds}
            </span>
            <span className="text-xl text-text-muted font-heading">sec</span>
          </div>
          <p className="text-xs text-text-muted mt-1">
            With {(EFFICIENCY * 100).toFixed(0)}% efficiency factor applied
          </p>
        </div>

        <div className="mt-8 space-y-4 border-t border-border-subtle pt-6">
          <ResultRow
            icon={<Battery size={14} />}
            label="Battery Energy"
            value={`${energyWh.toFixed(1)} Wh`}
          />
          <ResultRow
            icon={<Zap size={14} />}
            label="Power-to-Weight"
            value={`${weight > 0 ? (power / (weight / 1000)).toFixed(1) : "0"} W/kg`}
          />
          <ResultRow
            icon={<Clock size={14} />}
            label="Theoretical Max"
            value={`${power > 0 ? ((energyWh / power) * 60).toFixed(1) : "0"} min`}
          />
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  unit,
  value,
  onChange,
  icon,
  min,
  max,
  step,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="flex border border-border-subtle focus-within:border-accent transition-colors">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1 px-4 py-3 bg-transparent text-text font-heading font-bold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="px-4 py-3 bg-surface-dim text-text-muted text-sm font-bold flex items-center">
          {unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full mt-2 accent-accent h-1 cursor-pointer"
      />
    </div>
  );
}

function ResultRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-text-muted flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="font-bold font-heading">{value}</span>
    </div>
  );
}
