export type Bindings = {
	SLACK_WEBHOOK_URL: string;
};

export type Issue = {
	html_url: string;
	title: string;
	body: string;
	state: string;
	created_at: string;
	number: number;
	user: User;
};

type User = {
	html_url: string;
	login: string;
	avatar_url: string;
};
