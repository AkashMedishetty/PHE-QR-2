# R.I.S.E. Program — Badge QR Agenda

Interactive scientific agenda for the **R.I.S.E. Program** (Robotic Integrated Surgical Education) — the largest Robotix conclave in Hyderabad, hosted by ASI, American Oncology Institute (AOI) and Citizens Specialty Hospital. Attendees scan the QR code on their badge and land on the live agenda.

## Features

- **Interactive agenda**: full scientific program with live surgeries, video lectures and ceremonies
- **LIVE tracking**: on the event day, the current session is highlighted with a LIVE pill and a "happening now" banner (IST)
- **Search**: filter by procedure, speaker or chairperson
- **Mobile-first**: designed for a badge-QR scan on a phone
- **Static QR code**: the QR points at the domain root — update the agenda and redeploy, no badge reprints

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel:**
   - Connect this GitHub repo to Vercel and deploy

4. **Get the badge QR code:**
   - Visit `https://your-app.vercel.app/admin` and copy the QR code

## Updating the agenda

All program content lives in [`app/agenda/data.ts`](app/agenda/data.ts):

- `EVENT` — event name, hosts, venue, hours. Set `EVENT.date` (`YYYY-MM-DD`) and `EVENT.dateLabel` once the event date is fixed to enable the LIVE indicators on the day.
- `AGENDA` — the list of sessions (`surgery` / `lecture` / `ceremony` / `break`), each with time, topic, speakers and chairpersons.

Commit and push — Vercel redeploys, and the same QR code shows the updated program.

## File structure

```
├── app/
│   ├── page.tsx              # Home — renders the agenda
│   ├── agenda/
│   │   ├── data.ts           # Event details + full program (edit this)
│   │   ├── AgendaView.tsx    # Agenda UI (search, LIVE tracking)
│   │   └── agenda.css        # R.I.S.E. theme (navy / gold / cyan)
│   ├── admin/page.tsx        # Badge QR code generator
│   └── layout.tsx            # Metadata and viewport
└── package.json
```
