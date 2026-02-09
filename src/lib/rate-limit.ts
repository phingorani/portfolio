interface RequestRecord {
  count: number;
  resetTime: number;
}

const requestCache = new Map<string, RequestRecord>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string, currentTime: number = Date.now()): { allowed: boolean; remaining: number } {
   const record = requestCache.get(ip);

   if (!record || currentTime > record.resetTime) {
     requestCache.set(ip, {
       count: 1,
       resetTime: currentTime + WINDOW_MS,
     });
     return { allowed: true, remaining: MAX_REQUESTS - 1 };
   }

   record.count++;
   
   if (record.count > MAX_REQUESTS) {
     return { allowed: false, remaining: 0 };
   }

   return { allowed: true, remaining: MAX_REQUESTS - record.count };
 }

export function cleanupRateLimitCache(currentTime: number = Date.now()) {
   for (const [ip, record] of requestCache.entries()) {
     if (currentTime > record.resetTime) {
       requestCache.delete(ip);
     }
   }
 }

setInterval(() => cleanupRateLimitCache(Date.now()), WINDOW_MS);
