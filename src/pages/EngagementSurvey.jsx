import { useState } from 'react';
import { engagementSurveyData, surveyQuarters } from '../data/dummyData';

export default function EngagementSurvey() {
  const [quarter, setQuarter] = useState('Q2 2024');
  const data = engagementSurveyData.find(d => d.quarter === quarter);

  const avgScore = data ? (data.hasil.reduce((s, h) => s + h.rata_rata, 0) / data.hasil.length).toFixed(2) : 0;

  const scoreColor = (s) => {
    if (s >= 8.4) return 'var(--teal)';
    if (s >= 7.0) return '#f59e0b';
    return '#ef4444';
  };

  const NPSLabel = (n) => {
    if (n >= 50) return { label: 'Excellent', color: 'badge-green' };
    if (n >= 30) return { label: 'Good', color: 'badge-teal' };
    if (n >= 0) return { label: 'Perlu Perhatian', color: 'badge-yellow' };
    return { label: 'Critical', color: 'badge-red' };
  };

  const comparison = engagementSurveyData.length > 1 ? engagementSurveyData.find(d => d.quarter !== quarter) : null;

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Engagement Survey</h1>
          <p className="page-subtitle">Rekap hasil survey keterikatan karyawan per kuartal</p>
        </div>
        <button className="btn btn-primary">+ Kirim Survey Baru</button>
      </div>

      {/* Quarter selector */}
      <div className="filters-bar">
        <label className="form-label" style={{ marginBottom: 0 }}>Kuartal:</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {surveyQuarters.map(q => (
            <button key={q} className={`btn ${quarter === q ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setQuarter(q)}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {data && (
        <>
          {/* Summary row */}
          <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
            <div className="stat-card stat-accent-teal">
              <div className="stat-label">Responden</div>
              <div className="stat-value">{data.total_responden}</div>
              <div className="stat-sub">dari {12} karyawan</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Rata-rata Skor</div>
              <div className="stat-value" style={{ color: scoreColor(avgScore) }}>{avgScore}</div>
              <div className="stat-sub">skala 0–10</div>
            </div>
            <div className="stat-card stat-accent-pink">
              <div className="stat-label">NPS</div>
              <div className="stat-value" style={{ color: NPSLabel(data.NPS).color === 'badge-green' ? 'var(--teal)' : '#f59e0b' }}>
                {data.NPS}
              </div>
              <div className="stat-sub">skor 0-100</div>
            </div>
            {comparison && (
              <div className="stat-card">
                <div className="stat-label">vs {comparison.quarter}</div>
                <div className="stat-value" style={{ color: avgScore > (comparison.hasil.reduce((s, h) => s + h.rata_rata, 0) / comparison.hasil.length) ? 'var(--teal)' : '#ef4444', fontSize: 20 }}>
                  {avgScore > (comparison.hasil.reduce((s, h) => s + h.rata_rata, 0) / comparison.hasil.length) ? '↑' : '↓'} {Math.abs(avgScore - (comparison.hasil.reduce((s, h) => s + h.rata_rata, 0) / comparison.hasil.length)).toFixed(2)}
                </div>
                <div className="stat-sub">perubahan skor rata-rata</div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
            {/* Bar Chart */}
            <div className="card">
              <div className="card-header">
                <span className="card-title">Skor per Pertanyaan — {quarter}</span>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>Skala 0–10</span>
              </div>
              <div className="card-body">
                {data.hasil.map((h, i) => (
                  <div key={i} className="survey-bar">
                    <div className="survey-bar-label" title={h.pertanyaan}
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {h.pertanyaan}
                    </div>
                    <div className="survey-bar-track">
                      <div className="survey-bar-fill" style={{ width: `${(h.rata_rata / 10) * 100}%`, background: scoreColor(h.rata_rata) }} />
                    </div>
                    <div className="survey-bar-score" style={{ color: scoreColor(h.rata_rata) }}>{h.rata_rata.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison & Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* NPS Gauge */}
              <div className="card">
                <div className="card-header"><span className="card-title">NPS Score</span></div>
              <div className="card-body" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 56, fontWeight: 800, color: NPSLabel(data.NPS).color === 'badge-green' ? 'var(--teal)' : '#f59e0b', lineHeight: 1 }}>
                  {data.NPS}
                </div>
                <span className={`badge ${NPSLabel(data.NPS).color}`} style={{ marginTop: 8, display: 'inline-flex' }}>
                  {NPSLabel(data.NPS).label}
                </span>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 12, lineHeight: 1.5 }}>
                  NPS dihitung dari selisih promotor dan detractor karyawan. Skor &gt;50 = Excellent.
                  </div>
                </div>
              </div>

              {/* Quarter comparison */}
              {comparison && (
                <div className="card">
                  <div className="card-header"><span className="card-title">Perbandingan Kuartal</span></div>
                  <div className="card-body">
                    {data.hasil.map((h, i) => {
                      const prev = comparison.hasil[i];
                      const diff = prev ? (h.rata_rata - prev.rata_rata).toFixed(1) : null;
                      return (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 12 }}>
                          <span style={{ color: 'var(--gray-600)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={h.pertanyaan}>
                            {h.pertanyaan.split(' ').slice(0, 5).join(' ')}…
                          </span>
                          {diff !== null && (
                            <span style={{ fontWeight: 700, color: Number(diff) >= 0 ? 'var(--teal)' : '#ef4444' }}>
                              {Number(diff) >= 0 ? '+' : ''}{diff}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
