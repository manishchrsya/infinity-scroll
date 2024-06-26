// /* eslint-disable react-hooks/exhaustive-deps */
// import { useCallback, useEffect, useRef, useState } from "react";

// export const InfinityScroll = (props: any) => {
//   const { renderListItem, getData, listData, querry } = props;
//   const [loading, setLoading] = useState(false);

//   const pageNumber = useRef(1);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastObserver = useCallback((node: any) => {
//     console.log("loading ho rha hai", loading);
//     if (loading) return;
//     if (observer.current) {
//       observer.current.disconnect();
//     }

//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         pageNumber.current += 1;
//         fetchData();
//       }
//     });

//     if (node) {
//       observer.current.observe(node);
//     }
//   }, []);

//   const fetchData = useCallback(async () => {
//     if (querry) {
//       console.log("starting");

//       setLoading(true);
//       await getData(querry, pageNumber.current).finally(() => {
//         console.log("finally chal gaya");

//         setLoading(false);
//       });
//     }
//   }, [querry]);

//   useEffect(() => {
//     fetchData();
//   }, [querry]);

//   console.log("loading", loading);

//   const renderList = useCallback(() => {
//     return listData.map((item: any, index: number) => {
//       if (index === listData.length - 1) {
//         return renderListItem(item, index, lastObserver);
//       }
//       return renderListItem(item, index);
//     });
//   }, [listData]);

//   return (
//     <div>
//       {renderList()}
//       {loading && "LOADING"}
//     </div>
//   );
// };

import { useEffect, useRef, useState, useCallback } from "react";
export const InfiniteScroll = (props: any) => {
  const { renderListItem, getData, listData, query } = props;
  const pageNumber = useRef(1);
  const [loading, setLoading] = useState(false);

  const observer: any = useRef(null);

  const lastElementOberver = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchData();
      }
    });
    if (node) observer.current.observe(node);
  };

  const renderList = () => {
    return listData.map((item: any, index: number) => {
      if (index === listData.length - 1)
        return renderListItem(item, index, lastElementOberver);
      return renderListItem(item, index, null);
    });
  };

  const fetchData = useCallback(() => {
    setLoading(true);
    getData(query, pageNumber.current).finally(() => {
      setLoading(false);
    });
  }, [getData, query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {renderList()}
      {loading && "LOADING"}
    </>
  );
};
