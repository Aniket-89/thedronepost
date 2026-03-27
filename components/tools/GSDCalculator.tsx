"use client";

import { useState } from "react";
import { Camera, Ruler, Mountain, Grid3X3 } from "lucide-react";

const PRESETS = [
  { label: "DJI Mini 4 Pro", sensorWidth: 9.7, focalLength: 6.7, imageWidth: 4032, imageHeight: 3024 },
  { label: "DJI Mavic 3E", sensorWidth: 17.3, focalLength: 12.3, imageWidth: 5280, imageHeight: 3956 },
  { label: "Sony A7R (35mm)", sensorWidth: 35.9, focalLength: 35, imageWidth: 7952, imageHeight: 5304 },
  { label: "DJI Phantom 4 RTK", sensorWidth: 13.2, focalLength: 8.8, imageWidth: 5472, imageHeight: 3648 },
];

function calcGSD(sensorWidth: number, altitude: number, focalLength: number, imageWidth: number) {
  if (focalLength <= 0 || imageWidth <= 0) return 0;
  return (sensorWidth * altitude * 100) / (focalLength * imageWidth);
}

export function GSDCalculator() {
  const [sensorWidth, setSensorWidth] = useState(9.7);
  const [focalLength, setFocalLength] = useState(6.7);
  const [altitude, setAltitude] = useState(100);
  const [imageWidth, setImageWidth] = useState(4032);
  const [imageHeight, setImageHeight] = useState(3024);
  const [frontOverlap, setFrontOverlap] = useState(75);
  const [sideOverlap, setSideOverlap] = useState(65);

  const gsd = calcGSD(sensorWidth, altitude, focalLength, imageWidth);
  const coverageW = (gsd * imageWidth) / 100; // meters
  const coverageH = (gsd * imageHeight) / 100; // meters
  const coverageArea = (coverageW * coverageH) / 10000; // hectares
  const uniqueW = coverageW * (1 - frontOverlap / 100);
  const uniqueH = coverageH * (1 - sideOverlap / 100);
  const uniqueArea = (uniqueW * uniqueH) / 10000;

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setSensorWidth(preset.sensorWidth);
    setFocalLength(preset.focalLength);
    setImageWidth(preset.imageWidth);
    setImageHeight(preset.imageHeight);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      {/* Input Panel */}
      <div className="border border-border-subtle p-8 space-y-8">
        {/* Presets */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3 block">
            Camera Presets
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

        {/* Camera Inputs */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            Camera Sensor
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField
              label="Sensor Width"
              unit="mm"
              value={sensorWidth}
              onChange={setSensorWidth}
              icon={<Camera size={16} />}
              min={1}
              max={50}
              step={0.1}
            />
            <InputField
              label="Focal Length"
              unit="mm"
              value={focalLength}
              onChange={setFocalLength}
              icon={<Ruler size={16} />}
              min={1}
              max={200}
              step={0.1}
            />
            <InputField
              label="Image Width"
              unit="px"
              value={imageWidth}
              onChange={setImageWidth}
              icon={<Grid3X3 size={16} />}
              min={640}
              max={12000}
              step={1}
            />
            <InputField
              label="Image Height"
              unit="px"
              value={imageHeight}
              onChange={setImageHeight}
              icon={<Grid3X3 size={16} />}
              min={480}
              max={9000}
              step={1}
            />
          </div>
        </div>

        {/* Flight Inputs */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            Flight Parameters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InputField
              label="Altitude (AGL)"
              unit="m"
              value={altitude}
              onChange={setAltitude}
              icon={<Mountain size={16} />}
              min={5}
              max={500}
              step={5}
            />
            <InputField
              label="Front Overlap"
              unit="%"
              value={frontOverlap}
              onChange={setFrontOverlap}
              icon={<Grid3X3 size={16} />}
              min={0}
              max={95}
              step={5}
            />
            <InputField
              label="Side Overlap"
              unit="%"
              value={sideOverlap}
              onChange={setSideOverlap}
              icon={<Grid3X3 size={16} />}
              min={0}
              max={95}
              step={5}
            />
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="border border-accent p-8 flex flex-col justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-6">
            Ground Sample Distance
          </p>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-6xl font-bold font-heading tracking-tight">
              {gsd.toFixed(2)}
            </span>
            <span className="text-xl text-text-muted font-heading">cm/px</span>
          </div>
          <p className="text-xs text-text-muted">
            {gsd < 1
              ? "Sub-centimeter — excellent for inspection"
              : gsd < 3
              ? "High resolution — great for mapping"
              : gsd < 5
              ? "Standard mapping resolution"
              : "Low resolution — consider lower altitude"}
          </p>
        </div>

        <div className="mt-8 space-y-4 border-t border-border-subtle pt-6">
          <ResultRow
            label="Single Image Coverage"
            value={`${coverageW.toFixed(1)} × ${coverageH.toFixed(1)} m`}
          />
          <ResultRow
            label="Coverage Area"
            value={`${coverageArea.toFixed(3)} ha`}
          />
          <ResultRow
            label="Unique Coverage / Image"
            value={`${uniqueW.toFixed(1)} × ${uniqueH.toFixed(1)} m`}
          />
          <ResultRow
            label="Unique Area / Image"
            value={`${uniqueArea.toFixed(3)} ha`}
          />
          <ResultRow
            label="Images per Hectare"
            value={uniqueArea > 0 ? `~${Math.ceil(1 / uniqueArea)}` : "—"}
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

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-text-muted">{label}</span>
      <span className="font-bold font-heading">{value}</span>
    </div>
  );
}
