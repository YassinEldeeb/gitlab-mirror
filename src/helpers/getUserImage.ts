import { createCanvas, loadImage } from 'canvas'

export const getUserImage = async (
  imageURL: string,
  name: string
): Promise<Buffer> => {
  const canvas = createCanvas(200, 80)
  const ctx = canvas.getContext('2d')

  const imgData = await loadImage(imageURL)

  // Draw background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // Draw profile image
  ctx.drawImage(imgData, 15, 15, 50, 50)
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '20px Impact'
  // Draw username
  ctx.fillText(name, 65 + 10, 50 / 2 + 10 + 15)

  return canvas.toBuffer()
}
