/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

export const InfinityScroll = (props: any) => {
  const { renderListItem, getData, listData, querry } = props;
  const [loading, setLoading] = useState(false);

  const pageNumber = useRef(1);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastObserver = useCallback((node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        pageNumber.current += 1;
        fetchData();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, []);

  const fetchData = useCallback(() => {
    if (querry) {
      setLoading(true);
      getData(querry, pageNumber.current).finally(() => {
        setLoading(false);
      });
    }
  }, [querry]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("listdata", listData);

  const renderList = useCallback(() => {
    return listData.map((item: any, index: number) => {
      if (index === listData.length - 1) {
        return renderListItem(item, index, lastObserver);
      }
      return renderListItem(item, index);
    });
  }, [listData]);

  return (
    <div>
      {renderList()}
      {loading && "LOADING"}
    </div>
  );
};
