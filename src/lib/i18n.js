export const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'fa', label: 'فارسی' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
]

const dict = {
  en: {
    appTitle: 'AI Math Tutor',
    tagline: 'Learn Math from 2nd Grade to Masters',
    subtitle: 'Pick a level and topic, read a short explanation, and practice with step‑by‑step solutions.',
    level: 'Level', topic: 'Topic', difficulty: 'Difficulty', problems: 'Problems',
    explain: 'Explain', practice: 'Practice', quiz: 'Start Quiz',
    concept: 'Concept', practiceTitle: 'Practice', showAnswer: 'Show answer & steps',
    tip: 'Tip: Adjust difficulty and number of problems to your needs.',
    upload: 'Upload curriculum (PDF)', chooseFiles: 'Choose PDF(s)',
    userName: 'Your name', startQuiz: 'Start Quiz', submitQuiz: 'Submit Quiz',
    report: 'Report Card', points: 'Points', quizzes: 'Quizzes', recent: 'Recent',
  },
  fa: {
    appTitle: 'معلم ریاضی هوشمند',
    tagline: 'یادگیری ریاضی از دوم ابتدایی تا کارشناسی ارشد',
    subtitle: 'سطح و مبحث را انتخاب کنید، توضیح کوتاه بخوانید و با راه‌حل مرحله‌به‌مرحله تمرین کنید.',
    level: 'سطح', topic: 'مبحث', difficulty: 'سختی', problems: 'تعداد تمرین',
    explain: 'توضیح', practice: 'تمرین', quiz: 'آزمون',
    concept: 'مفهوم', practiceTitle: 'تمرین', showAnswer: 'نمایش پاسخ و مراحل',
    tip: 'نکته: درجه سختی و تعداد تمرین را متناسب با نیاز خود تنظیم کنید.',
    upload: 'بارگذاری سرفصل (PDF)', chooseFiles: 'انتخاب فایل‌های PDF',
    userName: 'نام شما', startQuiz: 'شروع آزمون', submitQuiz: 'ارسال آزمون',
    report: 'کارنامه', points: 'امتیاز', quizzes: 'آزمون‌ها', recent: 'اخیر',
  },
  de: {
    appTitle: 'KI-Mathelehrer',
    tagline: 'Mathe lernen von der 2. Klasse bis zum Master',
    subtitle: 'Wähle Niveau und Thema, lies eine kurze Erklärung und übe mit Schritt‑für‑Schritt‑Lösungen.',
    level: 'Niveau', topic: 'Thema', difficulty: 'Schwierigkeit', problems: 'Aufgaben',
    explain: 'Erklären', practice: 'Üben', quiz: 'Quiz starten',
    concept: 'Konzept', practiceTitle: 'Übungen', showAnswer: 'Antwort & Schritte anzeigen',
    tip: 'Tipp: Passe Schwierigkeit und Anzahl der Aufgaben an.',
    upload: 'Lehrplan hochladen (PDF)', chooseFiles: 'PDF(s) auswählen',
    userName: 'Dein Name', startQuiz: 'Quiz starten', submitQuiz: 'Quiz abgeben',
    report: 'Zeugnis', points: 'Punkte', quizzes: 'Quizze', recent: 'Kürzlich',
  },
  fr: {
    appTitle: 'Tuteur de Maths IA',
    tagline: 'Apprends les maths du CE1 au Master',
    subtitle: 'Choisis un niveau et un sujet, lis une brève explication et entraîne‑toi avec des solutions pas à pas.',
    level: 'Niveau', topic: 'Sujet', difficulty: 'Difficulté', problems: 'Exercices',
    explain: 'Expliquer', practice: 'S’entraîner', quiz: 'Démarrer le quiz',
    concept: 'Concept', practiceTitle: 'Exercices', showAnswer: 'Afficher la réponse et les étapes',
    tip: 'Astuce : Ajuste la difficulté et le nombre d’exercices selon tes besoins.',
    upload: 'Télécharger le programme (PDF)', chooseFiles: 'Choisir des PDF',
    userName: 'Ton nom', startQuiz: 'Démarrer le quiz', submitQuiz: 'Envoyer le quiz',
    report: 'Bulletin', points: 'Points', quizzes: 'Quiz', recent: 'Récent',
  }
}

export function t(lang, key){
  const d = dict[lang] || dict.en
  return d[key] || dict.en[key] || key
}
