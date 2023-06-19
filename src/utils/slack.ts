import { Issue } from '../types';

const compact = (array: unknown[]) => array.filter((el) => el);

export const constructGhIssueSlackMessage = (
	issue: Issue,
	issue_string: string,
	prefix_text?: string
) => {
	const issue_link = `<${issue.html_url}|${issue_string}>`;
	const user_link = `<${issue.user.html_url}|${issue.user.login}>`;
	const date = new Date(Date.parse(issue.created_at)).toLocaleDateString();

	const text_lines = [
		prefix_text,
		`*${issue.title} - ${issue_link}*`,
		issue.body,
		`*${issue.state}* - Created by ${user_link} on ${date}`,
	];

	return [
		{
			type: 'section',
			text: {
				type: 'mrkdwn',
				text: compact(text_lines).join('\n'),
			},
			accessory: {
				type: 'image',
				image_url: issue.user.avatar_url,
				alt_text: issue.user.login,
			},
		},
	];
};
