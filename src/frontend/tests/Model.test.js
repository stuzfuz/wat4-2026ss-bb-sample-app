import { expect, jest, test } from "@jest/globals";
import { CounterModel } from "../components/counter/model";

test('Model notifies subscribers', async () => {
  // arrange
  const expectedValue = 1337;
  const apiService = {
    getValue: jest.fn().mockResolvedValue(expectedValue)
  };

  const subscriberFn = jest.fn();
  // const subscriberFn = () => { /*...*/ };

  const model = new CounterModel(apiService);
  model.subscribe(() => subscriberFn());

  // act
  await model.initialize();

  // assert
  expect(apiService.getValue).toHaveBeenCalledTimes(1);
  expect(model.value).toStrictEqual(expectedValue);
  expect(subscriberFn).toHaveBeenCalledTimes(1);
});
