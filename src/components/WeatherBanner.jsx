export default function WeatherBanner() {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-5 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-cyan-500/10 p-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl">⛅</span>
        <div>
          <div className="text-2xl font-black tracking-tight">28°C</div>
          <div className="text-xs font-semibold text-ink-muted">Partly Cloudy · Bengaluru</div>
        </div>
      </div>
      <div className="flex flex-1 flex-wrap gap-x-6 gap-y-1 text-xs font-medium text-ink-muted">
        <span>💨 Wind 12 km/h</span>
        <span>💧 Humidity 58%</span>
        <span>🌧️ Rain chance 20%</span>
        <span>🕶️ AQI 62 · Moderate</span>
      </div>
      <div className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300">
        ⚠️ Light showers expected after 6 PM — carry an umbrella.
      </div>
    </div>
  );
}
