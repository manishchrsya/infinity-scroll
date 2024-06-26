import { ChangeEvent, useCallback, useRef, useState } from "react";
import "./App.css";
import { InfiniteScroll } from "./infinity-scroll";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const controllerRef: any = useRef(null);

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const getData = useCallback(async (querry: string, pageNumber: number) => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      controllerRef.current = new AbortController();

      const promise = await fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({
            q: querry,
            page: `${pageNumber}`,
          }),
        { signal: controllerRef.current.signal }
      );
      const data = await promise.json();
      setData((prev) => [...prev, ...data.docs] as any);
    } catch (error) {}
  }, []);

  const renderItem = useCallback(
    ({ title }: { title: string }, key: any, ref: any) => {
      return (
        <div key={key} ref={ref}>
          {title}
        </div>
      );
    },
    []
  );

  return (
    <>
      <input type="text" onChange={handleInput} value={query} />
      <InfiniteScroll
        renderListItem={renderItem}
        getData={getData}
        listData={data}
        query={query}
      />
    </>
  );
}

export default App;
