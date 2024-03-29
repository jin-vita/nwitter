import { firestore } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet.trim() === "") {
      setNweet("");
      return;
    }
    try {
      await addDoc(collection(firestore, "nweets"), {
        nweet,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};

export default Home;
