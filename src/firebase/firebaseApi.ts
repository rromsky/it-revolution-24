import {
  query,
  where,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { store } from "./index";

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;

  return `${formattedMonth}-${formattedDay}-${year}`;
}

export const addNewUrl = async ({ id, url }: { id: string; url: string }) => {
  await setDoc(doc(store, "urls", `${id}`), {
    id: id,
    url: url,
    totalViewers: 0,
    date: formatDate(new Date()),
  });
};

export const getUrlFromId = async ({ id }: { id: string }) => {
  const urlRef = query(collection(store, "urls"), where("id", "==", `${id}`));
  try {
    const fetchedUrls = await getDocs(urlRef);
    const data = fetchedUrls.docs.map((el) => {
      return { ...el.data() };
    })[0];

    await updateDoc(doc(store, "urls", `${id}`), {
      totalViewers: data.totalViewers + 1,
    });

    return data.url;
  } catch (e) {
    return null;
  }
};
