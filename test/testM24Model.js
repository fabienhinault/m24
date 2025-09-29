import { equal, notEqual, ok, deepEqual } from 'assert';
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

    it('(RS)^3 = R(SRSR)S = R(SR)^-1S = RR^-1S^-1S = I', function () {
      let model = new Model(new DummyEventDispatcher());
      for(let i = 0; i < 3; i++) {
        model.R();
        model.S();
      }
      ok(model.equalsGoal());
    });


    it('(LS)^3 = (SL)^3 = I', function () {
      let model = new Model(new DummyEventDispatcher());
      for(let i = 0; i < 3; i++) {
        model.L();
        model.S();
      }
      ok(model.equalsGoal());
      for(let i = 0; i < 3; i++) {
        model.S();
        model.L();
      }
      ok(model.equalsGoal());
    });


    it('applyArray', function () {
      let model = new Model(new DummyEventDispatcher());
      model.applyArray([2, -3, 12, 0]);
      let res = [...model.numbers];
      model.reset();

      model.R();
      model.R();
      model.S();
      for (let i = 0; i < 3; i++) {
        model.L();
      }
      model.S();
      for (let i = 0; i < 12; i++) {
        model.R();
      }
      model.S();

      deepEqual(model.numbers, res);
    });

    it('simple transforms which keep 0 and 1, with periods', function () {
      let model = new Model(new DummyEventDispatcher());
      let as = 
        [[[2, -3, 12, 0], 7], [[3, -2, -4, 0], 6], [[4, 2, -3, 0], 6], [[5, -10, 11, 0], 5],
         [[6, -7, 8, 0], 5], [[7, -6, 5, 0], 11], [[8, -9, 4, 0], 8], [[9, -8, 7, 0], 11],
         [[10, -5, 6, 0], 5],
         [[-2, -4, 9, 0], 11], [[-3, 12, 10, 0], 8], [[-4, 9, -8, 0], 8], [[-5, 6, -7, 0], 11],
         [[-6, 5, -10, 0], 5], [[-7, 8, -9, 0], 11], [[-8, 7, -6, 0], 5], [[-9, 4, 2, 0], 11],
         [[-10, 11, 3, 0],8]]
      for (let ap of as) {
        let a = ap[0];
        let period = ap[1];
        for (let i = 0; i < period - 1; i++) {
          model.applyArray(a);
          equal(model.numbers[0], 0);
          equal(model.numbers[1], 1);
          ok(!model.equalsGoal());
        }
        model.applyArray(a);
        ok(model.equalsGoal());
      }
    });
  });
});
