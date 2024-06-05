import { Hono } from 'hono';
import { fetchGithubIssue, parseGhIssueString } from '../utils/github';
import { constructGhIssueSlackMessage } from '../utils/slack';
import { Issue } from '../types';

const app = new Hono();

app.post('/', async (c) => {
	const { text } = await c.req.parseBody();
	if (typeof text !== 'string') {
		return c.notFound();
	}

	const { owner, repo, issue_number } = parseGhIssueString(text);
	const response = await fetchGithubIssue(owner, repo, issue_number);
	const issue = await response.json<Issue>();
	const blocks = constructGhIssueSlackMessage(issue, text);

	return c.json({
		blocks,
		response_type: 'in_channel',
	});
});

app.onError((_e, c) => {
	return c.text(
		"Uh-oh! We couldn't find the issue you provided. " +
			'We can only find public issues in the following format: `owner/repo#issue_number`.'
	);
});

export default app;
