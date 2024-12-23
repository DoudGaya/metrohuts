import { generateOgImage } from './utils/generateOgImage'

export const runtime = 'edge'

export const alt = 'MetroHuts'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return generateOgImage('Welcome to MetroHuts')
}

