import { createCanvas, loadImage } from 'canvas'

export const getUserImage = async (
  imageURL: string,
  name: string
): Promise<Buffer> => {
  const canvas = createCanvas(240, 70)
  const ctx = canvas.getContext('2d')

  const imgData = await loadImage(imageURL)

  // Draw background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Save the context so we can undo the clipping region at a later time
  ctx.save()

  // Define the clipping region as an 360 degrees arc at point x and y
  ctx.beginPath()
  ctx.arc(35, 35, 35, 0, 2 * Math.PI, false)

  // Clip!
  ctx.clip()

  // Draw profile image
  ctx.drawImage(imgData, 0, 0, 70, 70)

  // Restore the clipping
  ctx.restore()

  // Draw username
  ctx.fillStyle = '#FFFFFF'
  ctx.font = '25px Impact'
  ctx.fillText(name, 65 + 20, 70 / 2 + 11)

  return canvas.toBuffer()
}
