import {List, Map} from 'immutable';
import {expect} from 'chai';

//app-specific imports
import {setEntries} from '../src/core';

describe('application-code', () => {

	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});
	});

	describe('it should be a string array', () => {
		it('makes a list of strings', () => {
			const state = Map();
			const entries = ['Trainspotting', 'hello bitch'];
			const nextState = state.set('entries', List(entries));
			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', 'hello bitch')
			}));
		});
	});
});