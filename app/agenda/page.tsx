'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { EVENT, REGISTRATION, SESSIONS, toMinutes, formatTime, AgendaItem, Session } from './data'
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
    item.topic, item.subtitle, item.faculty, item.moderator,
    item.debateFor, item.debateAgainst, ...(item.panelists ?? []),
  ].filter(Boolean).join(' ').toLowerCase()
  return hay.includes(q)
}

function sessionMatches(session: Session, q: string): boolean {
  if (session.title.toLowerCase().includes(q)) return true
  if (session.chairs.some(c => c.toLowerCase().includes(q))) return true
  return session.items.some(i => itemMatches(i, q))
}

function KindBadge({ kind }: { kind?: AgendaItem['kind'] }) {
  if (!kind || kind === 'talk') return null
  const labels: Record<string, string> = {
    keynote: 'Keynote',
    panel: 'Panel',
    debate: 'Debate',
    ceremony: 'Ceremony',
    interaction: 'Q & A',
    break: '',
  }
  const label = labels[kind]
  if (!label) return null
  return <span className={`kind-badge kind-${kind}`}>{label}</span>
}

function ItemRow({ item, status }: { item: AgendaItem; status: LiveStatus }) {
  return (
    <div className={`agenda-item status-${status} ${item.kind === 'break' ? 'item-break' : ''}`}>
      <div className="item-time">
        <span className="time-start">{formatTime(item.start)}</span>
        <span className="time-end">{formatTime(item.end)}</span>
        {status === 'live' && <span className="live-pill"><span className="live-dot" />LIVE</span>}
      </div>
      <div className="item-body">
        <div className="item-topic">
          <KindBadge kind={item.kind} />
          <span>{item.topic}</span>
        </div>
        {item.subtitle && <div className="item-subtitle">{item.subtitle}</div>}
        {item.faculty && <div className="item-faculty">{item.faculty}</div>}
        {item.moderator && (
          <div className="item-panel">
            <div className="panel-role"><strong>Moderator:</strong> {item.moderator}</div>
            {item.panelists && (
              <div className="panelist-chips">
                {item.panelists.map(p => <span key={p} className="chip">{p}</span>)}
              </div>
            )}
          </div>
        )}
        {(item.debateFor || item.debateAgainst) && (
          <div className="debate-sides">
            <div className="debate-side debate-for">
              <span className="side-label">For</span>
              <span>{item.debateFor}</span>
            </div>
            <div className="debate-vs">vs</div>
            <div className="debate-side debate-against">
              <span className="side-label">Against</span>
              <span>{item.debateAgainst}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AgendaPage() {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [now, setNow] = useState<{ dateStr: string; minutes: number } | null>(null)
  const liveRef = useRef<HTMLDivElement | null>(null)

  // Tick every 30s so the LIVE indicator moves during the event
  useEffect(() => {
    setNow(nowInIST())
    const id = setInterval(() => setNow(nowInIST()), 30_000)
    return () => clearInterval(id)
  }, [])

  const isEventDay = now?.dateStr === EVENT.cmeDay.date
  const nowMin = now?.minutes ?? 0
  const q = query.trim().toLowerCase()

  const visibleSessions = useMemo(
    () => (q ? SESSIONS.filter(s => sessionMatches(s, q)) : SESSIONS),
    [q],
  )

  // Session containing the live item (for the sticky "now" banner)
  const liveSession = useMemo(() => {
    if (!isEventDay) return null
    return SESSIONS.find(s => s.items.some(i => itemStatus(i, true, nowMin) === 'live')) ?? null
  }, [isEventDay, nowMin])

  const allCollapsed = visibleSessions.every(s => collapsed[s.id])
  const toggleAll = () => {
    const next: Record<string, boolean> = {}
    SESSIONS.forEach(s => { next[s.id] = !allCollapsed })
    setCollapsed(next)
  }

  const jumpToLive = () => {
    liveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const registrationStatus = itemStatus(REGISTRATION, !!isEventDay, nowMin)
  const showRegistration = !q || itemMatches(REGISTRATION, q)

  return (
    <div className="agenda-page">
      <header className="agenda-hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">FehmiCare Hospital presents</div>
          <h1 className="hero-title">
            FEHMI<span className="hero-title-accent">CON</span> <span className="hero-year">2026</span>
          </h1>
          <p className="hero-theme">{EVENT.theme}</p>
          <div className="hero-meta">
            <div className="meta-card">
              <span className="meta-label">Scientific Program · CME</span>
              <span className="meta-value">Sunday, 12th July 2026</span>
              <span className="meta-detail">{EVENT.cmeDay.venue} — {EVENT.cmeDay.venueDetail}</span>
            </div>
            <div className="meta-card meta-card-secondary">
              <span className="meta-label">Workshop</span>
              <span className="meta-value">Saturday, 11th July 2026</span>
              <span className="meta-detail">{EVENT.workshopDay.venue} — {EVENT.workshopDay.venueDetail}</span>
            </div>
          </div>
          <div className="hero-credits">{EVENT.credits}</div>
        </div>
      </header>

      <div className="agenda-toolbar">
        <input
          type="search"
          className="agenda-search"
          placeholder="Search topics, speakers, sessions…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search the scientific program"
        />
        <button className="toolbar-btn" onClick={toggleAll}>
          {allCollapsed ? 'Expand all' : 'Collapse all'}
        </button>
      </div>

      {liveSession && (
        <button className="now-banner" onClick={jumpToLive}>
          <span className="live-dot" />
          Happening now in {liveSession.title} — tap to jump
        </button>
      )}

      <main className="agenda-list">
        {showRegistration && (
          <div className="registration-card">
            <ItemRow item={REGISTRATION} status={registrationStatus} />
          </div>
        )}

        {visibleSessions.length === 0 && !showRegistration && (
          <div className="no-results">
            No matches for “{query}”.
            <button className="toolbar-btn" onClick={() => setQuery('')}>Clear search</button>
          </div>
        )}

        {visibleSessions.map(session => {
          const isCollapsed = q ? false : collapsed[session.id]
          const items = q ? session.items.filter(i => itemMatches(i, q) || sessionHeaderMatch(session, q)) : session.items
          const shownItems = items.length > 0 ? items : session.items
          const hasLive = session.items.some(i => itemStatus(i, !!isEventDay, nowMin) === 'live')
          return (
            <section
              key={session.id}
              className={`session-card ${hasLive ? 'session-live' : ''}`}
              style={{ ['--session-color' as any]: session.color }}
              ref={hasLive ? liveRef : undefined}
            >
              <button
                className="session-header"
                onClick={() => setCollapsed(c => ({ ...c, [session.id]: !c[session.id] }))}
                aria-expanded={!isCollapsed}
              >
                <div className="session-header-main">
                  <span className="session-title">{session.title}</span>
                  <span className="session-time">
                    {formatTime(session.items[0].start)} – {formatTime(session.items[session.items.length - 1].end)}
                  </span>
                </div>
                <div className="session-chairs">
                  <span className="chairs-label">{session.chairLabel}:</span> {session.chairs.join(' · ')}
                </div>
                <span className={`chevron ${isCollapsed ? '' : 'chevron-open'}`} aria-hidden>▾</span>
              </button>
              {!isCollapsed && (
                <div className="session-items">
                  {shownItems.map(item => (
                    <ItemRow
                      key={`${item.start}-${item.topic}`}
                      item={item}
                      status={itemStatus(item, !!isEventDay, nowMin)}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </main>

      <footer className="agenda-footer">
        <Link href="/" className="brochure-link">📄 View Full Event Brochure</Link>
        <p className="footer-note">Last date for e-posters: 5th July 2026</p>
        <p className="footer-contact">
          For details: {EVENT.contact.join(' · ')} · {EVENT.website}
        </p>
      </footer>
    </div>
  )
}

function sessionHeaderMatch(session: Session, q: string): boolean {
  return session.title.toLowerCase().includes(q) || session.chairs.some(c => c.toLowerCase().includes(q))
}
