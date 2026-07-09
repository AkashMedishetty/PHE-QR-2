// FEHMICON 2026 Scientific Program — Sunday, 12th July 2026
// Venue: Ghulam Ahmed Hall, Sultan Uloom Educational Society, MJ College, Banjara Hills-3, Hyderabad

export interface AgendaItem {
  start: string // "HH:MM" 24h
  end: string
  topic: string
  faculty?: string
  kind?: 'talk' | 'break' | 'ceremony' | 'keynote' | 'panel' | 'debate' | 'interaction'
  moderator?: string
  panelists?: string[]
  debateFor?: string
  debateAgainst?: string
  subtitle?: string
}

export interface Session {
  id: string
  title: string
  chairLabel: 'Chairpersons' | 'Judges'
  chairs: string[]
  color: string // accent color for the session
  items: AgendaItem[]
}

export const EVENT = {
  name: 'FEHMICON 2026',
  theme: 'Artificial Intelligence in Obstetrics and Gynaecology',
  cmeDay: {
    label: 'CME · Sunday, 12th July 2026',
    date: '2026-07-12',
    venue: 'Ghulam Ahmed Hall',
    venueDetail: 'Sultan Uloom Educational Society, MJ College, Banjara Hills-3, Hyderabad',
  },
  workshopDay: {
    label: 'Workshop · Saturday, 11th July 2026',
    venue: 'FehmiCare Hospital',
    venueDetail: '37, Tahirvilla, Yousufguda Checkpost, Hyderabad',
  },
  credits: 'TGMC Approved · 2WS + 2 CME Credit Points',
  contact: ['99496 96196', '83748 76030'],
  website: 'www.fehmicare.com',
}

export const REGISTRATION: AgendaItem = {
  start: '08:00',
  end: '08:30',
  topic: 'Registration',
  kind: 'break',
}

export const SESSIONS: Session[] = [
  {
    id: 'session-1',
    title: 'Session 1',
    chairLabel: 'Chairpersons',
    chairs: ['Dr G Vijaya Lakshmi', 'Dr Madhulata Alexander', 'Dr Suvarna'],
    color: '#0d7377',
    items: [
      { start: '08:30', end: '08:45', topic: 'Welcome and Introduction', kind: 'ceremony' },
      { start: '08:45', end: '09:00', topic: 'Artificial Intelligence for Smarter Antenatal Care', faculty: 'Dr Manjula Rao' },
      { start: '09:00', end: '09:15', topic: 'Remote AI management to reduce Maternal and Perinatal Mortality', faculty: 'Dr Ismath Fathima' },
      { start: '09:15', end: '09:30', topic: 'Perinatology: Powered by Artificial Intelligence', faculty: 'Dr Tejo Pratap' },
      { start: '09:30', end: '09:45', topic: 'Interaction', kind: 'interaction' },
    ],
  },
  {
    id: 'session-2',
    title: 'Session 2',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Fahmida Banu', 'Dr Garuda Lakshmi', 'Dr Sumitra Vaidyam'],
    color: '#b8860b',
    items: [
      { start: '09:45', end: '10:00', topic: 'Fetal Medicine — AI from Detection to Prediction', faculty: 'Dr Chinmayee Ratha' },
      { start: '10:00', end: '10:15', topic: 'Seeing Beyond the Image: AI in Reproductive Ultrasound', faculty: 'Dr Mamata Deendayal' },
      { start: '10:15', end: '10:30', topic: 'The Synergy of AI and Robotics in Hysterectomy', faculty: 'Dr Anita Kunnaiah' },
      { start: '10:30', end: '10:45', topic: 'Interaction', kind: 'interaction' },
    ],
  },
  {
    id: 'session-3',
    title: 'Session 3',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Naga Sundari', 'Dr Jaisree Reddy'],
    color: '#b05a7a',
    items: [
      { start: '10:45', end: '11:00', topic: 'Practical points to Clinicians for using AI in OP and IP', faculty: 'Dr Raja Poladi' },
      { start: '11:00', end: '11:15', topic: 'AI in Endoscopy', faculty: 'Dr L Fahmida Banu' },
    ],
  },
  {
    id: 'keynote',
    title: 'Keynote & Inauguration',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Bhanumathy', 'Dr Usha Nag'],
    color: '#c2571a',
    items: [
      {
        start: '11:15', end: '11:35',
        topic: 'Keynote Address — Telesurgery: Bridging distances, expanding expertise',
        faculty: 'Dr Syed Mohammed Ghouse',
        kind: 'keynote',
      },
      { start: '11:35', end: '12:15', topic: 'Inauguration', kind: 'ceremony' },
    ],
  },
  {
    id: 'session-4',
    title: 'Session 4',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Vandana', 'Dr Swetha Thummala'],
    color: '#2e7d52',
    items: [
      { start: '12:15', end: '12:30', topic: 'Artificial Intelligence in Pathology: What Every Clinician Should Know', faculty: 'Dr Anuradha Sekaran' },
      { start: '12:30', end: '12:45', topic: 'Artificial Intelligence — A New Dimension in Fertility Treatment', faculty: 'Dr Aishwarya Nupur' },
      { start: '12:45', end: '13:45', topic: 'Lunch', kind: 'break' },
    ],
  },
  {
    id: 'session-5',
    title: 'Session 5',
    chairLabel: 'Chairpersons',
    chairs: ['Dr E Prabhavathi', 'Dr Sardarunnisa'],
    color: '#2273a8',
    items: [
      {
        start: '13:45', end: '14:30',
        topic: 'Panel Discussion — AI updates in clinical practice',
        kind: 'panel',
        moderator: 'Dr Bharti Abhyankar',
        panelists: [
          'Dr Aruna Suman',
          'Dr Jayanthi Reddy',
          'Dr Jayabharti Vaddi',
          'Dr Kola Sasikala',
          'Dr Leela Digumati',
          'Dr Narsimha Reddy',
        ],
      },
    ],
  },
  {
    id: 'session-6',
    title: 'Session 6',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Lakshmi Ratna', 'Dr Janaki', 'Dr Payal Bhargava'],
    color: '#a8385c',
    items: [
      { start: '14:30', end: '14:45', topic: "AI a New tool in patient's Hand — Be Aware", faculty: 'Dr Ashwini Kumar Setya' },
      { start: '14:45', end: '15:00', topic: 'AI Powered Cancer Screening', faculty: 'Dr Aruna Nigam' },
      { start: '15:00', end: '15:15', topic: 'AI in Radiotherapy — Enhancing Accuracy and Efficiency', faculty: 'Dr Kaushik Bhattacharya' },
    ],
  },
  {
    id: 'session-7',
    title: 'Session 7',
    chairLabel: 'Judges',
    chairs: ['Dr Tripura Sundari', 'Dr Sandhya Dixit', 'Dr Manasa Badveli'],
    color: '#6a4fa3',
    items: [
      {
        start: '15:15', end: '15:45',
        topic: 'Debate — AI vs Human Expertise',
        subtitle: 'Who should have the final say in patient care?',
        kind: 'debate',
        debateFor: 'Dr Ujwala Prakash',
        debateAgainst: 'Dr Rajshree Paladi',
      },
    ],
  },
  {
    id: 'session-8',
    title: 'Session 8',
    chairLabel: 'Chairpersons',
    chairs: ['Dr Sahitya Bammidi', 'Dr Muthineni Rajini'],
    color: '#0d7377',
    items: [
      { start: '15:45', end: '16:00', topic: 'How to Learn AI', faculty: 'Dr Shagufta Fehmina' },
      { start: '16:00', end: '16:15', topic: 'From Data to Decisions: AI is Next Essential Clinical Tool', faculty: 'Dr Rajesh Kommu' },
      { start: '16:15', end: '16:30', topic: 'Prize Distribution, Valedictory and Vote of Thanks', kind: 'ceremony' },
    ],
  },
]

// "HH:MM" -> minutes since midnight
export function toMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// minutes since midnight -> "h:MM AM/PM"
export function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${m.toString().padStart(2, '0')} ${period}`
}
