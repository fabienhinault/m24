import { equal, notEqual, ok } from 'assert';
import {Chrono, Model, DummyEventDispatcher} from '../m24Model.js';
describe('M 24', function () {
  describe('transforms', function () {
    it('should start at goal', function () {
      let model = new Model(new DummyEventDispatcher());
      ok(model.equalsGoal());
      equal(model.numbers.length, 24);
    });

    it('L is not identity', function () {
      let model = new Model(new DummyEventDispatcher());
      model.L();
      ok(!model.equalsGoal());
      equal(model.numbers.length, 24);
      equal(model.numbers[0], 0);
      equal(model.numbers[1], 2);
    });

    it('R is not identity', function () {
        let model = new Model(new DummyEventDispatcher());
        model.R();
        ok(!model.equalsGoal());
        equal(model.numbers.length, 24);
        equal(model.numbers[0], 0);
        equal(model.numbers[1], 23);
    });

    it('S is not identity', function () {
    let model = new Model(new DummyEventDispatcher());
    model.S();
    ok(!model.equalsGoal());
    equal(model.numbers.length, 24);
    equal(model.numbers[0], 1);
    equal(model.numbers[1], 0);
    });

    it('L and R are inverses', function () {
      let model = new Model(new DummyEventDispatcher());
      model.L();
      model.R();
      ok(model.equalsGoal());
      equal(model.numbers.length, 24);
    });

    it('S is its own inverse', function () {
        let model = new Model(new DummyEventDispatcher());
        model.S();
        model.S();
        ok(model.equalsGoal());
    });

    it('L s period is 23', function () {
        let model = new Model(new DummyEventDispatcher());
        for(let i = 0; i < 23; i++) {
            model.L();
        }
        ok(model.equalsGoal());
    });

    it('R s period is 23', function () {
        let model = new Model(new DummyEventDispatcher());
        for(let i = 0; i < 23; i++) {
            model.R();
        }
        ok(model.equalsGoal());
    });

    it("should shuffle", function () {
        let model = new Model(new DummyEventDispatcher());
        model.shuffleDefault();
        ok(!model.equalsGoal());
    });

    it('SR s period is 3', function () {
      let model = new Model(new DummyEventDispatcher());
      for(let i = 0; i < 3; i++) {
        model.S();
        model.R();
      }
      ok(model.equalsGoal());
    });
  });
});
