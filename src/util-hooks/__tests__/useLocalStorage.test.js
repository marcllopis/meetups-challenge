import { renderHook, act } from "@testing-library/react-hooks";
import useStateWithLocalStorage, {
  parseLocalStorageArray,
} from "../useLocalStorage";

const TEST_KEY = "key";
const TEST_VALUE = { test: "test" };

describe("useLocalStorage hook", () => {
  it("should set localStorage with default value", () => {
    // calls custom hook with key and value
    renderHook(() => useStateWithLocalStorage(TEST_VALUE, TEST_KEY));
    expect(parseLocalStorageArray(TEST_KEY)).toEqual(TEST_VALUE);
  });

  it("should set the default value from localStorage if it exists", () => {
    // set the predefined localStorage value
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_VALUE));
    // sets the initial value as empty
    const { result } = renderHook(() => useStateWithLocalStorage({}, TEST_KEY));
    // double check that the value is really stored in localStorage not just an empty object
    const [value] = result.current;
    expect(value).toEqual(TEST_VALUE);
    // checks the value comes from localStorage not empty object
    expect(parseLocalStorageArray(TEST_KEY)).toEqual(TEST_VALUE);
  });

  it("should update localStorage when state changes", () => {
    // starts localStorage with test object
    const { result } = renderHook(() =>
      useStateWithLocalStorage(TEST_VALUE, TEST_KEY)
    );
    const [, setValue] = result.current;
    // updates the state with new values
    const newValue = { anotherValue: "Some value" };
    act(() => {
      setValue(newValue);
    });
    // localStorage shows the new updated value
    expect(parseLocalStorageArray(TEST_KEY)).toEqual(newValue);
  });
});
