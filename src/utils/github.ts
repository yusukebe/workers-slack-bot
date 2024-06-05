const ghIssueRegex = /(?<owner>[\w.-]*)\/(?<repo>[\w.-]*)\#(?<issue_number>\d*)/;

export const parseGhIssueString = (text: string) => {
	const match = text.match(ghIssueRegex);
	return match ? match.groups ?? {} : {};
};

export const fetchGithubIssue = (owner: string, repo: string, issue_number: string) => {
	const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`;
	const headers = { 'User-Agent': 'simple-worker-slack-bot' };
	return fetch(url, { headers });
};
