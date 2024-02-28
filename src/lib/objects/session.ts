export class KieraCachedSession {
	public webToken?: string;
	public userID?: string;
	public username?: string;

	constructor(init: { webToken: string; userID: string } | Partial<KieraCachedSession>) {
		this.webToken = init?.webToken;
		this.userID = init?.userID;
	}

	public get headers() {
		return { webToken: this.webToken, userID: this.userID };
	}

	public get isCached(): boolean {
		return this.webToken !== undefined && this.userID !== undefined;
	}
}
