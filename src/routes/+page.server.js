import { GEOCODER_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export async function load({ request, getClientAddress }) {
	// Get user's IP address
	const userIP = getClientAddress();

	let locationData = null;

	if (GEOCODER_API_KEY && userIP) {
		try {
			// Call the Hack Club geocoding API
			const response = await fetch(
				`https://geocoder.hackclub.com/v1/geoip?ip=${userIP}&key=${GEOCODER_API_KEY}`
			);

			if (response.ok) {
				locationData = await response.json();
			}
		} catch (error) {
			console.error('Failed to fetch location data:', error);
		}
	}

	// Silicon Valley event details
	const eventDetails = {
		location: 'Silicon Valley, CA',
		dates: 'September 27-28, 2025',
		venue: 'TBD - Premium Silicon Valley Location',
		capacity: '200+ students',
		features: [
			'State-of-the-art workspace',
			'Silicon Valley tech mentors',
			'Premium catering',
			'Hardware lending library',
			'Transportation assistance'
		]
	};

	return {
		userCity: locationData?.city,
		eventDetails
	};
}
