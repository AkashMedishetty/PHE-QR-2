'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { EVENT, AGENDA, COMMITTEE, toMinutes, formatTime, AgendaItem } from './data'
import './agenda.css'

type LiveStatus = 'past' | 'live' | 'upcoming' | 'none'

// Current time in IST as { dateStr: "YYYY-MM-DD", minutes: minutes since midnight }
function nowInIST(): { dateStr: string; minutes: number } {
  const now = new Date()
  const ist = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now)
  const get = (type: string) => ist.find(p => p.type === type)?.value ?? '00'
  return {
    dateStr: `${get('year')}-${get('month')}-${get('day')}`,
    minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10),
  }
}

function itemStatus(item: AgendaItem, isEventDay: boolean, nowMin: number): LiveStatus {
  if (!isEventDay) return 'none'
  if (nowMin >= toMinutes(item.end)) return 'past'
  if (nowMin >= toMinutes(item.start)) return 'live'
  return 'upcoming'
}

function itemMatches(item: AgendaItem, q: string): boolean {
  const hay = [
    item.session, item.topic, item.subtitle,
    ...(item.speakers ?? []), ...(item.chairs ?? []),
  ].filter(Boolean).join(' ').toLowerCase()
  return hay.includes(q)
}

const KIND_LABELS: Record<AgendaItem['kind'], string> = {
  surgery: 'Live Surgery',
  lecture: 'Video Lecture',
  ceremony: 'Ceremony',
  break: '',
}

function ItemCard({ item, status, liveRef }: {
  item: AgendaItem
  status: LiveStatus
  liveRef?: React.Ref<HTMLElement>
}) {
  if (item.kind === 'break') {
    return (
      <section className={`agenda-break status-${status}`}>
        <span className="break-time">{formatTime(item.start)} – {formatTime(item.end)}</span>
        <span className="break-label">{item.session}</span>
        {status === 'live' && <span className="live-pill"><span className="live-dot" />NOW</span>}
      </section>
    )
  }

  const badge = KIND_LABELS[item.kind]
  const title = item.topic ?? item.session
  const showSessionBadge = item.topic ? item.session : badge

  return (
    <section
      ref={liveRef}
      className={`agenda-card kind-${item.kind} status-${status} ${status === 'live' ? 'card-live' : ''}`}
    >
      <div className="card-top">
        <div className="card-time">
          <span className="time-start">{formatTime(item.start)}</span>
          <span className="time-end">{formatTime(item.end)}</span>
        </div>
        <div className="card-badges">
          <span className={`kind-badge badge-${item.kind}`}>{showSessionBadge}</span>
          {status === 'live' && <span className="live-pill"><span className="live-dot" />LIVE</span>}
        </div>
      </div>

      <h2 className="card-topic">{title}</h2>
      {item.subtitle && <p className="card-subtitle">{item.subtitle}</p>}

      {item.speakers && item.speakers.length > 0 && (
        <div className="card-people">
          <span className="people-label">{item.speakersLabel ?? 'Speakers'}</span>
          <div className="people-chips">
            {item.speakers.map(s => <span key={s} className="chip chip-speaker">{s}</span>)}
          </div>
        </div>
      )}

      {item.chairs && item.chairs.length > 0 && (
        <div className="card-people">
          <span className="people-label">Chairpersons</span>
          <div className="people-chips">
            {item.chairs.map(c => <span key={c} className="chip chip-chair">{c}</span>)}
          </div>
        </div>
      )}
    </section>
  )
}

export default function AgendaPage() {
  const [query, setQuery] = useState('')
  const [now, setNow] = useState<{ dateStr: string; minutes: number } | null>(null)
  const liveRef = useRef<HTMLElement | null>(null)

  // Tick every 30s so the LIVE indicator moves during the event
  useEffect(() => {
    setNow(nowInIST())
    const id = setInterval(() => setNow(nowInIST()), 30_000)
    return () => clearInterval(id)
  }, [])

  const isEventDay = !!EVENT.date && now?.dateStr === EVENT.date
  const nowMin = now?.minutes ?? 0
  const q = query.trim().toLowerCase()

  const visibleItems = useMemo(
    () => (q ? AGENDA.filter(i => itemMatches(i, q)) : AGENDA),
    [q],
  )

  const liveItem = useMemo(() => {
    if (!isEventDay) return null
    return AGENDA.find(i => itemStatus(i, true, nowMin) === 'live') ?? null
  }, [isEventDay, nowMin])

  const jumpToLive = () => {
    liveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="agenda-page">
      <header className="agenda-hero">
        <div className="hero-inner">
          <div className="hero-logos">
            <img src="/asi-logo.png" alt="The Association of Surgeons of India" className="logo-asi" />
            <span className="logo-sep" aria-hidden />
            <img src="/aoi-logo-white.png" alt="American Oncology Institute — Precision Cancer Care" className="logo-aoi" />
            <span className="logo-sep" aria-hidden />
            <img src="/citizens-logo-white.png" alt="Citizens Specialty Hospital" className="logo-citizens" />
          </div>
          <h1 className="hero-title">
            R.I.S.E. <span className="hero-title-accent">PROGRAM</span>
          </h1>
          <p className="hero-fullname">({EVENT.fullName})</p>

          <div className="hero-chip">
            <div className="chip-tagline">{EVENT.tagline}</div>
            <div className="chip-divider" />
            <div className="chip-highlight">{EVENT.highlight}</div>
            <div className="chip-divider" />
            <div className="chip-theme">{EVENT.theme}</div>
            <div className="chip-pillars">{EVENT.pillars}</div>
          </div>

          <div className="hero-meta">
            <div className="meta-card">
              <span className="meta-label">Scientific Program</span>
              <span className="meta-value">{EVENT.dateLabel || EVENT.hours}</span>
              <span className="meta-detail">
                {EVENT.dateLabel ? `${EVENT.hours} · ` : ''}{EVENT.venue}, {EVENT.venueDetail}
              </span>
            </div>
          </div>

          <div className="hero-actions">
            <a
              href="/rise-program.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn"
            >
              📄 Open Program
            </a>
            <a
              href="/rise-program.pdf"
              download="RISE Program.pdf"
              className="hero-btn hero-btn-outline"
            >
              ⬇️ Download PDF
            </a>
          </div>
        </div>
      </header>

      <div className="agenda-toolbar">
        <input
          type="search"
          className="agenda-search"
          placeholder="Search procedures, speakers, chairpersons…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search the scientific program"
        />
      </div>

      {liveItem && (
        <button className="now-banner" onClick={jumpToLive}>
          <span className="live-dot" />
          Happening now: {liveItem.topic ?? liveItem.session} — tap to jump
        </button>
      )}

      <main className="agenda-list">
        {visibleItems.length === 0 && (
          <div className="no-results">
            No matches for “{query}”.
            <button className="toolbar-btn" onClick={() => setQuery('')}>Clear search</button>
          </div>
        )}

        {visibleItems.map(item => {
          const status = itemStatus(item, isEventDay, nowMin)
          return (
            <ItemCard
              key={`${item.start}-${item.session}`}
              item={item}
              status={status}
              liveRef={status === 'live' ? liveRef : undefined}
            />
          )
        })}
      </main>

      <section className="committee">
        <h2 className="committee-title">Organising Committee</h2>
        <div className="committee-grid">
          {COMMITTEE.map(m => (
            <div key={m.role} className="committee-card">
              <span className="committee-role">{m.role}</span>
              <span className="committee-name">{m.name}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="agenda-footer">
        <div className="footer-buttons">
          <a
            href="/rise-program.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-btn"
          >
            📄 Open Full Program (PDF)
          </a>
          <a
            href="/rise-program.pdf"
            download="RISE Program.pdf"
            className="footer-btn footer-btn-outline"
          >
            ⬇️ Download Program
          </a>
        </div>
        <p>{EVENT.name} · {EVENT.fullName}</p>
        <p className="footer-hosts">{EVENT.hosts}</p>
      </footer>
    </div>
  )
}
