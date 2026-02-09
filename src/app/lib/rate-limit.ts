interface RequestRecord {
  count: number;
  resetTime: number;
}

const requestCache = new Map<string, RequestRecord>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = requestCache.get(ip);

  if (!record || now > record.resetTime) {
    requestCache.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  record.count++;
  
  if (record.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}

export function cleanupRateLimitCache() {
  const now = Date.now();
  for (const [ip, record] of requestCache.entries()) {
    if (now > record.resetTime) {
      requestCache.delete(ip);
    }
  }
}

setInterval(cleanupRateLimitCache, WINDOW_MS);
