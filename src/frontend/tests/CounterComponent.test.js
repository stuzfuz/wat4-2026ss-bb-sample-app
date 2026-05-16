/**
 * @jest-environment jsdom
 */

import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test
} from '@jest/globals';
import DomUtils from './utils/dom-utils.js';

beforeEach(() => {
  expect.hasAssertions();
});

describe('When ApiService returns initial value 1, increments to 2 and decrements to 3', () => {
  const mockGetValue = jest.fn().mockResolvedValue(1);
  const mockIncrement = jest.fn().mockResolvedValue(2);
  const mockDecrement = jest.fn().mockResolvedValue(3);

  beforeAll(() => {
    jest.unstable_mockModule("../api-service.js", () => ({
      ApiService: jest.fn().mockImplementation(() => ({
        getValue: mockGetValue,
        increment: mockIncrement,
        decrement: mockDecrement,
      }))
    }));
  });

  beforeEach(() => {
    mockGetValue.mockClear();
    mockIncrement.mockClear();
    mockDecrement.mockClear();
    // jest.clearAllMocks();
  });

  test('CounterComponent should display initial value 1', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();

    document.body.append(counter);

    await DomUtils.update();

    const valueElement = counter.shadowRoot.querySelector("#counter-value");
    expect(valueElement.innerHTML).toBe("1");

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(0);
    expect(mockDecrement).toHaveBeenCalledTimes(0);
  });

  test('CounterComponent should display incremented value 2', async () => {
    const counterComponentModule = await import('../components/counter/component.js')
    const counter = new counterComponentModule.CounterComponent();

    document.body.append(counter);

    await DomUtils.update();

    const incrementButton = counter.shadowRoot.getElementById("increment");
    incrementButton.click();

    await DomUtils.update();

    const valueElement = counter.shadowRoot.querySelector("#counter-value");
    expect(valueElement.innerHTML).toBe("2");

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(1);
    expect(mockDecrement).toHaveBeenCalledTimes(0);
  });

  test('CounterComponent should display decremented value 3', async () => {
    const counterComponentModule = await import('../components/counter/component.js')
    const counter = new counterComponentModule.CounterComponent();

    document.body.append(counter);

    await DomUtils.update();

    const incrementButton = counter.shadowRoot.getElementById("decrement");
    incrementButton.click();

    await DomUtils.update();

    const valueElement = counter.shadowRoot.querySelector("#counter-value");
    expect(valueElement.innerHTML).toBe("3");

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(0);
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    jest.unstable_unmockModule("../api-service.js");
  });
});
