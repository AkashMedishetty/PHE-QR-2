// R.I.S.E. PROGRAM (Robotic Integrated Surgical Education) — Scientific Program
// Hosted by ASI · American Oncology Institute · Citizens Specialty Hospital, Hyderabad

export interface AgendaItem {
  start: string // "HH:MM" 24h
  end: string
  session: string // e.g. "Live Surgery", "Video Lecture 1"
  topic?: string
  subtitle?: string
  speakers?: string[]
  speakersLabel?: string // defaults to "Speakers"
  chairs?: string[]
  kind: 'surgery' | 'lecture' | 'ceremony' | 'break'
}

export const EVENT = {
  name: 'R.I.S.E. PROGRAM',
  fullName: 'Robotic Integrated Surgical Education',
  tagline: 'Largest Robotix Conclave in Hyderabad',
  highlight: 'Live Surgical Demonstrations & Keynotes',
  theme: 'Redefining Robotic Surgeries in Cancer Care',
  pillars: 'Prevention | Precision | Personalization',
  hosts: 'ASI · American Oncology Institute · Citizens Specialty Hospital',
  venue: 'Citizens Specialty Hospital',
  venueDetail: 'Hyderabad',
  // Event date as "YYYY-MM-DD" — enables the LIVE indicators on the day (IST)
  date: '2026-07-12',
  dateLabel: 'Sunday, 12th July 2026',
  hours: '8:00 AM – 5:00 PM',
}

export const COMMITTEE = [
  { role: 'Advisor', name: 'Dr. Suresh Chandra Hari' },
  { role: 'Chief Patron', name: 'Dr. Jagdishwar Goud Gajagowni' },
  { role: 'Chairman', name: 'Dr. M. Bala Vikas Kumar' },
  { role: 'Organising Secretary', name: 'Dr. P. Pragnia' },
]

const SURGICAL_TEAM = [
  'Dr. Jagdishwar Goud Gajagowni',
  'Dr. Bala Vikas Kumar',
  'Dr. Pragnia',
  'Dr. Soumya',
]

export const AGENDA: AgendaItem[] = [
  {
    start: '08:00', end: '09:00',
    session: 'Registration',
    kind: 'break',
  },
  {
    start: '09:00', end: '10:00',
    session: 'Live Surgery',
    topic: 'Robotic Esophagectomy — Thoracic Stage',
    speakers: SURGICAL_TEAM,
    speakersLabel: 'Operating Team',
    chairs: ['Dr. M Vijaya Kumar', 'Dr. Srinivasulu Mukta', 'Dr. Bala Murugan', 'Dr. Saravana Rajamanickam'],
    kind: 'surgery',
  },
  {
    start: '10:00', end: '10:15',
    session: 'Video Lecture 1',
    topic: 'Journey into Robotic HPB Surgery: From Basics to Complex Resections',
    speakers: ['Dr. Kalayarasan Raja'],
    chairs: ['Dr. Madhusudhan Chinthakindi', 'Dr. Subbaiah Shanmugam', 'Dr. Biswabasu Das', 'Dr. Jagannath Dixit', 'Dr. Mallik Singaraju'],
    kind: 'lecture',
  },
  {
    start: '10:15', end: '11:15',
    session: 'Live Surgery',
    topic: 'Robotic Esophagectomy — Abdominal Stage',
    speakers: SURGICAL_TEAM,
    speakersLabel: 'Operating Team',
    chairs: ['Dr. Vijay Raj Patil', 'Dr. Kalayarasan Raja', 'Dr. Jalaluddin Akbar', 'Dr. Jagannath Dixit'],
    kind: 'surgery',
  },
  {
    start: '11:15', end: '11:30',
    session: 'Video Lecture 2',
    topic: 'Robotic Omentectomy & Para-aortic Lymph Node Dissection',
    speakers: ['Dr. Pallavi V R'],
    chairs: ['Dr. Anbukkani Subbian', 'Dr. AVS Suresh', 'Dr. Harjot Kaur Bajwa', 'Dr. R Suchitra', 'Dr. Suneel Kaushik'],
    kind: 'lecture',
  },
  {
    start: '11:30', end: '12:30',
    session: 'Live Surgery',
    topic: 'Robotic Hysterectomy + Sentinel Node Biopsy',
    speakers: SURGICAL_TEAM,
    speakersLabel: 'Operating Team',
    chairs: ['Dr. Jayanthi Reddy', 'Dr. Pallavi V R', 'Dr. Anbukkani Subbian', 'Dr. R Suchitra', 'Dr. Pujitha Devi Suraneni'],
    kind: 'surgery',
  },
  {
    start: '12:30', end: '13:00',
    session: 'Welcome Note & Inaugural Session',
    speakers: [
      'Dr. Prabhakar Palacharla — RCOO (South), AOI & Citizens Hospitals',
      'Mr. Dileep Mangsuli — Chairman, CTSI',
      'Dr. M Vijaya Kumar',
      'Dr. Suresh Chandra Hari',
      'Dr. T Jeevan Rao',
      'Dr. B. Ramesh',
      'Dr. Gaddi Diwakar',
    ],
    speakersLabel: 'Dignitaries',
    chairs: ['Dr. Mandala Iliaiah', 'Dr. Venkateshwarlu Perugu', 'Dr. Jagdishwar Goud Gajagowni', 'Dr. B Raju'],
    kind: 'ceremony',
  },
  {
    start: '13:00', end: '13:15',
    session: 'Felicitation & Award of Excellence',
    speakers: ['Dr. Gaddi Diwakar', 'Dr. M Vijaya Kumar', 'Dr. Srinivasulu Mukta', 'Dr. Jagdishwar Goud Gajagowni'],
    speakersLabel: 'Presenters',
    chairs: ['Dr. Madhusudhan Chinthakindi', 'Dr. Kalayarasan Raja', 'Dr. Saravana Rajamanickam'],
    kind: 'ceremony',
  },
  {
    start: '13:15', end: '13:45',
    session: 'Lunch',
    kind: 'break',
  },
  {
    start: '13:45', end: '14:45',
    session: 'Live Surgery',
    topic: 'Robotic Hernioplasty (TAPP)',
    speakers: ['Dr. Suresh Chandra Hari', 'Dr. Vishal Soni'],
    speakersLabel: 'Operating Team',
    chairs: ['Dr. Madhushekhar B', 'Dr. G Laxmana Sastry', 'Dr. Mandala Ilaiah', 'Dr. T Jeevan Rao', 'Dr. B Raju', 'Dr. B Ramesh'],
    kind: 'surgery',
  },
  {
    start: '14:45', end: '15:00',
    session: 'Video Lecture 3',
    topic: 'Beyond Lobectomy: Robotics for Complex Airway Reconstruction',
    speakers: ['Dr. Saravana Rajamanickam'],
    chairs: ['Dr. Bala Murugan', 'Dr. Vijay Raj Patil', 'Dr. Pratap Varma P', 'Dr. Nishith / Dr. Goutham Rao'],
    kind: 'lecture',
  },
  {
    start: '15:00', end: '16:40',
    session: 'Live Surgery',
    topic: 'Robotic LAR (Low Anterior Resection)',
    speakers: SURGICAL_TEAM,
    speakersLabel: 'Operating Team',
    chairs: ['Dr. Subbaiah Shanmugam', 'Dr. Biswabasu Das', 'Dr. Rajkumar Rathinasamy', 'Dr. Dharmendra Kumar Vennam'],
    kind: 'surgery',
  },
  {
    start: '16:40', end: '17:00',
    session: 'Vote of Thanks',
    kind: 'ceremony',
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
