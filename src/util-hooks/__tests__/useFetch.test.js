import { renderHook } from "@testing-library/react-hooks";
import { useFetch } from "../useFetch";

describe("useFetch", () => {
  it("should fetch and set data", async () => {
    // spy on the fetch method and mock the promise return with a simple data object
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: "test data" }),
      })
    );
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch({ url: "test.com" })
    );
    // at the beginning data should be null since the promise is not yet resolved
    expect(result.current.data).toBe(null);
    expect(fetch).toHaveBeenCalledWith("test.com");
    // wait for the promise to be resolved
    await waitForNextUpdate();
    // data should have the expected result if the promise is resolved
    expect(result.current.data).toEqual({ data: "test data" });
  });
});
