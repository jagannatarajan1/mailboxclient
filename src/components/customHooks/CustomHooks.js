import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { emailSliceAction } from "../pages/emailSlice";
import { useSelector } from "react-redux";

export const useApi = (url) => {
  const dispatch = useDispatch();
  const [receiverData, setReceiverData] = useState([]);
  const emailSelector = useSelector((state) => state.login.email);
  const refreshSelector = useSelector((state) => state.email.refresh);

  useEffect(() => {
    const fetchDataFunction = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedData = [];
        let totalUnreadedEmail = 0;
        console.log("useeffffecttt");
        for (const key in data) {
          fetchedData.push({
            id: key,
            ...data[key],
          });
          if (!data[key].readedMessage) {
            totalUnreadedEmail += 1;
          }
        }
        dispatch(emailSliceAction.unreadedMessage(totalUnreadedEmail));
        setReceiverData(fetchedData);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchDataFunction();

    const intervalId = setInterval(fetchDataFunction, 2000);
    return () => clearInterval(intervalId);
  }, [url, dispatch, refreshSelector]);

  return { receiverData };
};
