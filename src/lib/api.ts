import API from './endpoints';
import { Decision } from './objects/decision.js';
import axios, { type AxiosResponse } from 'axios';
import { getSessionHeaders } from './session.js';

export type APIResponse<T> = AxiosResponse<{ status: string; success: boolean; data?: T }>;

export async function getDecisions() {
	try {
		const { data } = (await axios(API.DecisionsList, {
			method: 'GET',
			headers: getSessionHeaders().headers
		})) as APIResponse<Array<Decision>>;

		return data.data;
	} catch (error) {
		console.error('DecisionAPI Error =>', error);
		return [];
	}
}

export async function getDecision(_id: string) {
	try {
		const resp = (await axios(API.DecisionManagerEditor, {
			method: 'POST',
			headers: getSessionHeaders().headers,
			data: { _id }
		})) as APIResponse<Decision>;

		return new Decision(resp.data.data);
	} catch (error) {
		console.error('DecisionAPI Error =>', error);
		return new Decision();
	}
}

export async function saveDecision(decision: Decision) {
	try {
		const resp = (await axios(API.DecisionManagerUpdateProps, {
			method: 'PATCH',
			headers: getSessionHeaders().headers,
			data: {
				_id: decision._id,
				name: decision.name,
				description: decision.description,
				enabled: decision.enabled,
				serverWhitelist: decision.serverWhitelist,
				userWhitelist: decision.userWhitelist,
				userBlacklist: decision.userBlacklist,
				consumeMode: decision.consumeMode,
				consumeReset: decision.consumeReset
			}
		})) as APIResponse<Decision>;

		return resp.data.success;
	} catch (error) {
		console.error('DecisionAPI Error =>', error);
		return false;
	}
}
