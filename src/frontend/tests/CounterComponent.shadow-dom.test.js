/**
 * @jest-environment jsdom
 */

import { jest, describe, expect, test, beforeAll, beforeEach, afterAll } from '@jest/globals';
import '@testing-library/jest-dom'
import { findByTestId, fireEvent, getByTestId, waitFor } from "@testing-library/dom";
import { findByShadowText, getByShadowTestId, getByShadowText } from "shadow-dom-testing-library"

beforeEach(() => {
  expect.hasAssertions();
});

describe('When ApiService returns initial value 10 and increments to 20', () => {
  const mockGetValue = jest.fn().mockResolvedValue(10);
  const mockIncrement = jest.fn().mockResolvedValue(20);
  const mockDecrement = jest.fn();

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
  });

  test('CounterComponent should display initial value 10', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();

    document.body.append(counter);

    // const incrementButton = await findByShadowText(counter, "Increment");
    // expect(incrementButton).toBeInTheDocument();

    const valueElement = await findByShadowText(counter, /counter:/i); // <h2>Counter: <span id="counter-value" data-testid="counter-value">0</span></h2>
    const valueSpan = await findByTestId(valueElement, "counter-value"); // <span id="counter-value" data-testid="counter-value">0</span>
    expect(valueSpan).toHaveTextContent("10");

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(0);
    expect(mockDecrement).toHaveBeenCalledTimes(0);

    expect(counter).toMatchSnapshot();
    expect(counter.shadowRoot).toMatchSnapshot();
  });

  test('CounterComponent should display incremented value 20', async () => {
    const counterComponentModule = await import('../components/counter/component.js');
    const counter = new counterComponentModule.CounterComponent();

    document.body.append(counter);

    const incrementButton = await findByShadowText(counter, "Increment");
    // incrementButton.click();
    fireEvent.click(incrementButton);

    await waitFor(() => {
      const valueSpan = getByShadowTestId(counter, "counter-value");
      expect(valueSpan).toHaveTextContent("20");
    });

    expect(mockGetValue).toHaveBeenCalledTimes(1);
    expect(mockIncrement).toHaveBeenCalledTimes(1);
    expect(mockDecrement).toHaveBeenCalledTimes(0);

    expect(counter).toMatchSnapshot();
    expect(counter.shadowRoot).toMatchSnapshot();
  });

  afterAll(() => {
    jest.unstable_unmockModule("../api-service.js");
  });
});
