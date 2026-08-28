export function initGamedevPage({ caseRail }) {
  caseRail.init();
  return () => caseRail.destroy();
}
