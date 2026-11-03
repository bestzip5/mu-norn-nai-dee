export function getResearchSourceKey(source: { url: string; checkedOn: string }) {
  return `${source.url}-${source.checkedOn}`;
}
