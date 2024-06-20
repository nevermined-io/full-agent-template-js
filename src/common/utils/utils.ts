export function extractAuthTokenFromHeader(
  request: Request
): string | undefined {
  try {
    const [type, token] = request.headers['authorization'].split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  } catch (error) {
    return undefined
  }
}
