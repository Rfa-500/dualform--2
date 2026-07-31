/** Return an explicit, cacheable response for retired URLs with no replacement. */
export default function handler(request, response) {
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400');
  response.status(410).send('Gone');
}
