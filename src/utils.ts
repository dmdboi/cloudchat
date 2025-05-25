export function getDatacenter(cf: IncomingRequestCfProperties | undefined): string {
  if (!cf) return "unknown";

  return cf.colo;
}
