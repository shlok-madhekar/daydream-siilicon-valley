import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID, GEOCODER_API_KEY } from '$env/static/private';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	// Silicon Valley specific locations for Daydream SV
	const locations = [
		{
			lat: 37.4419,
			lng: -122.143,
			event_name: 'Daydream Silicon Valley',
			city: 'Palo Alto',
			state: 'CA',
			country: 'USA'
		},
		{
			lat: 37.3861,
			lng: -122.0839,
			event_name: 'Silicon Valley Tech Hub',
			city: 'Mountain View',
			state: 'CA',
			country: 'USA'
		},
		{
			lat: 37.3382,
			lng: -121.8863,
			event_name: 'San Jose Convention Center',
			city: 'San Jose',
			state: 'CA',
			country: 'USA'
		},
		{
			lat: 37.3688,
			lng: -122.0363,
			event_name: 'Sunnyvale Community',
			city: 'Sunnyvale',
			state: 'CA',
			country: 'USA'
		},
		{
			lat: 37.323,
			lng: -122.0322,
			event_name: 'Cupertino Innovation',
			city: 'Cupertino',
			state: 'CA',
			country: 'USA'
		}
	];

	return {
		locations
	};
}
