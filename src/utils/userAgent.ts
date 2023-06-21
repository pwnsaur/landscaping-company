export function isMobileUserAgent(userAgent: string): boolean {
  return /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
