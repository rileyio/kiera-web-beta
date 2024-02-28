import { KieraCachedSession } from './objects/session.js';

/**
 * Fetch Session from LocalStorage cache
 * @export
 * @returns
 */
export function getSessionHeaders() {
	// Get session from cookie
	const cookies = Object.fromEntries(
		document.cookie.split('; ').map((c) => [c.split('=')[0], c.split('=')[1]])
	);

	const userID = cookies.userID as string;
	const webToken = cookies.webToken as string;

	if (!userID && !webToken) {
		console.warn('No session!');
		return new KieraCachedSession({});
	}

	return new KieraCachedSession({ userID, webToken });
}

/**
 * Set Session in LocalStorage cache
 * @export
 * @param {string} username
 * @param {string} session
 */
export function setSessionHeaders(username: string, userID: string, session: string) {
	localStorage.setItem(
		'kiera-session',
		JSON.stringify({
			username,
			userID,
			session
		})
	);
}

export function delSession() {
	localStorage.removeItem('kiera-session');
}
