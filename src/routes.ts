import Home from './routes/Home.svelte';
import Decisions from './routes/decisions/Decisions.svelte';
import Decision from './routes/decisions/Decision.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
	'/': Home,
	// '/lorem/:repeat': Lorem,
	// The catch-all route must always be last
	'/decisions': Decisions,
	'/decision/:id': Decision,
	'*': NotFound
};
