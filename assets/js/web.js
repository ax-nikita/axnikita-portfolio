export function initWebPage({ caseRail }) {
  caseRail.init();
  return () => caseRail.destroy();
}
