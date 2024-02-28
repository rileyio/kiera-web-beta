const endpoints = {
	dev: {
		Auth: '/api/otl',
		VerifySession: '/api/session/verify',
		User: '/api/ck/user',
		DecisionsList: '/api/decisions',
		DecisionManagerEditor: '/api/decision',
		DecisionManagerUpdateProps: '/api/decision/props',
		DecisionManagerUpdateConsumeReset: '/api/decision/consumeReset',
		DecisionManagerNewOutcome: '/api/decision/outcome',
		DecisionManagerDeleteOutcome: '/api/decision/outcome',
		DecisionManagerUpdateOutcome: '/api/decision/outcome',
		DecisionManagerNew: '/api/decision',
		DecisionManagerDelete: '/api/decision',
		DecisionManagerResetConsumed: '/api/decision/consumedReset'
	},

	prod: {
		Auth: 'https://kierabot.xyz/api/otl',
		VerifySession: 'https://kierabot.xyz/api/session/verify',
		User: 'https://kierabot.xyz/api/ck/user',
		DecisionsList: 'https://kierabot.xyz/api/decisions',
		DecisionManagerEditor: 'https://kierabot.xyz/api/decision',
		DecisionManagerUpdateProps: 'https://kierabot.xyz/api/decision/props',
		DecisionManagerUpdateConsumeReset: 'https://kierabot.xyz/api/decision/consumeReset',
		DecisionManagerNewOutcome: 'https://kierabot.xyz/api/decision/outcome',
		DecisionManagerDeleteOutcome: 'https://kierabot.xyz/api/decision/outcome',
		DecisionManagerUpdateOutcome: 'https://kierabot.xyz/api/decision/outcome',
		DecisionManagerNew: 'https://kierabot.xyz/api/decision',
		DecisionManagerDelete: 'https://kierabot.xyz/api/decision',
		DecisionManagerResetConsumed: 'https://kierabot.xyz/api/decision/consumedReset'
	}
};

export default process.env.NODE_ENV === 'development' ? endpoints.dev : endpoints.prod;
