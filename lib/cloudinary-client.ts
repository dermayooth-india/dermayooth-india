// Client-side helper to build Cloudinary image URLs.
// Returns the original URL if it's already an absolute URL, or builds
// a Cloudinary delivery URL using the public cloud name exposed via
// NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME.
export function cloudinaryUrl(image: string, opts?: { width?: number; height?: number; crop?: string }): string | undefined {
	if (!image) return undefined

	// Already a full URL (could be Cloudinary or other CDN)
	if (image.startsWith("http://") || image.startsWith("https://")) return image

	// If image already looks like a Cloudinary delivery path, return as-is
	if (image.includes("res.cloudinary.com") || image.includes("/image/upload/")) return image

	const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
	if (!cloud) return image // fall back to the provided string

	// Basic transformation string (optional)
	const transforms: string[] = []
	if (opts?.width) transforms.push(`w_${opts.width}`)
	if (opts?.height) transforms.push(`h_${opts.height}`)
	if (opts?.crop) transforms.push(opts.crop)

	const transformSegment = transforms.length ? `${transforms.join(',')}/` : ''

	// Build URL assuming `image` is the public id (without extension) or path
	// Normalize leading slash
	const publicId = image.startsWith("/") ? image.slice(1) : image

	return `https://res.cloudinary.com/${cloud}/image/upload/${transformSegment}${publicId}`
}
