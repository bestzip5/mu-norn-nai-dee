export const brokenSourceUrls = new Set<string>([
  "https://www.eg.mahidol.ac.th/dept/egie/phd/content/attach/44/1_Student-Handout01-Th.pdf",
  "https://thebestplusresidence.com/",
  "https://www.facebook.com/share/1AFMd9HXLG/",
]);

export function isBrokenSource(url?: string | null): boolean {
  if (!url) return false;
  if (brokenSourceUrls.has(url)) return true;
  if (url.includes("propertyhub.in.th")) return true;
  if (url.includes("thebestplusresidence.com")) return true;
  return false;
}

export function isNoteSource(url?: string | null): boolean {
  if (!url) return false;
  return url.startsWith("/data-notes/");
}

