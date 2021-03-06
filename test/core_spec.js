import {List, Map} from 'immutable';
import {expect} from 'chai';

//app-specific imports
import {setEntries, next, vote} from '../src/core';

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

	describe('next', () => {

		it('takes the next two entries under vote', () => {
			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));
		});
	});

	describe('vote', () => {

		it('creates a tally for the voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));
		});

		it('adds to existing tally for voted entry', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 2,
						'28 Days Later': 3
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 3,
						'28 Days Later': 3
					})
				}),
				entries: List()
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