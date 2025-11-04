
const capitalize = (s: string): string => {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const parseMatchUrl = (url: string): { home: string | null; away: string | null } => {
  try {
    const urlObject = new URL(url);
    if (!urlObject.hostname.includes('besoccer.com')) {
      return { home: null, away: null };
    }

    const path = urlObject.pathname;
    const parts = path.split('/').filter(Boolean);

    const matchIndex = parts.indexOf('match');
    if (matchIndex > -1 && parts.length >= matchIndex + 3) {
      const home = parts[matchIndex + 1].split('-').map(capitalize).join(' ');
      const away = parts[matchIndex + 2].split('-').map(capitalize).join(' ');
      return { home, away };
    }
  } catch (error) {
    console.error('Invalid URL:', error);
  }
  return { home: null, away: null };
};
