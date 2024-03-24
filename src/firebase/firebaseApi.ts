import {
  query,
  where,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { store } from "./index";
const auth = getAuth();

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;

  return `${formattedMonth}-${formattedDay}-${year}`;
}

export const addNewUrl = async ({ id, url }: { id: string; url: string }) => {
  const newUrl = {
    owner: auth.currentUser?.uid || "anonymous",
    id: id,
    url: url,
    name: `url-${id}`,
    fullUrl: `https://rromsky.tech/it-revolution-24/url/${id}`,
    totalViewers: 0,
    date: formatDate(new Date()),
  };

  await setDoc(doc(store, "urls", `${id}`), newUrl);

  return newUrl;
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

export const getUrlsFromUser = async () => {
  const urlRef = query(
    collection(store, "urls"),
    where("owner", "==", `${auth.currentUser?.uid}`)
  );
  try {
    const fetchedUrls = await getDocs(urlRef);
    const data = fetchedUrls.docs.map((el) => {
      return { ...el.data() };
    });
    return data;
  } catch (e) {
    return null;
  }
};
export const updateUrl = async (newUrl: any) => {
  await updateDoc(doc(store, "urls", `${newUrl.id}`), {
    ...newUrl,
  });
};

export const deleteUrl = async (id: string) => {
  await deleteDoc(doc(store, "urls", `${id}`));
};
export const userRegister = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw new Error(errorMessage);
    });
};

export const userSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  signInWithEmailAndPassword(auth, email, password)
    .then()
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      throw new Error(errorMessage);
    });
};
