"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import useSocket from "@/State/useSocket";

import { httpAxios } from "@/helper/httpaxios";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import clsx from "clsx";

import CryptoJS from "crypto-js";

function Page() {

  interface data {
    sender: any;
    receiver: any;
    content: any;
  }

  const params = useParams();
  const { id } = params;
  const [message, setMessage] = useState<any>();
  const [messages, setMessages] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [originalMessages, setOriginalMessages] = useState<data[]>([]);
  let senderid: String | null = "";
  if (typeof window !== "undefined") {
    senderid = localStorage.getItem("id");
  }

  const socket = useSocket(senderid);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    httpAxios.get(`/user/singleuser/${id}`).then((response) => {
      setReceiver(response.data.name);
    });
    httpAxios.get(`/user/messages/${id}/${senderid}`).then((response) => {
      const decryptedMessages = response.data.map(decryptmessage);
      setOriginalMessages(decryptedMessages);
      setMessages(decryptedMessages);
    });

    const decryptmessage = (msg: any) => {
      const bytes = CryptoJS.AES.decrypt(msg.content, "rasel");
      const originalText = bytes.toString(CryptoJS.enc.Utf8);

      return { ...msg, content: originalText };
    };

    if (socket) {
      socket.on("receiveMessage", (msg: any) => {
        console.log(msg);
        setMessages((prevMessages: any) => [
          ...prevMessages,
          decryptmessage(msg),
        ]);
      });
    }
  }, [socket]);

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (socket && message.trim()) {
      const ciphertext = CryptoJS.AES.encrypt(message, "rasel").toString();

      socket.emit("sendMessage", {
        sender: senderid,
        receiver: id,
        content: ciphertext,
      });
      setMessage("");
    }
  };

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setMessages(originalMessages);
    } else {
      
      const filteredMessages = originalMessages.filter((message) =>
        message.content.toLowerCase().includes(query.toLowerCase())
      );
      setMessages(filteredMessages);
    }
  };

  return (
    <section className="bg-cyan-700 h-full relative ">
      <div className="flex w-full  bg-gray-800 border-l-2 items-center px-4">
        <FaUserAlt className="text-4xl" />
        <p className="text-left text-4xl py-2 w-full  ml-4">{receiver}</p>
        <form>
          <input
            className="bg-slate-700 h-10 w-[30rem] outline-none border-b mr-5 px-4 rounded-sm"
            type="search"
            name="search"
            id="search"
            placeholder="Search your message"
            onChange={handleSearch}
            value={searchQuery}
          />
        </form>
        <IoIosSearch className="text-4xl mr-10 " />
      </div>

      <div className="w-full p-4 flex flex-col h-[85%] ">
        <div className="flex-grow overflow-x-hidden h-10">
          {messages.map((msg: any, index: any) => (
            <p
              className={clsx(
                "my-6 px-2 text-2xl  break-words whitespace-pre-wrap ",
                { "text-right": msg.sender === senderid }
              )}
              key={index}
            >
              <span
                className={clsx(
                  "px-4 py-2 m-2 rounded-xl",
                  { "bg-primary": msg.sender === senderid },
                  { "bg-secondary": msg.sender != senderid }
                )}
              >
                {msg.content}
              </span>
            </p>
          ))}
        </div>
        <div className="flex-none mt-4 absolute bottom-0 left-0 w-full p-4">
          <form
            onSubmit={handleSumbit}
            className="w-full flex items-center px-2"
          >
            <input
              className="w-full h-10 text-black px-2"
              type="text"
              placeholder="Enter message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              value={message}
              name="content"
            />
            <button type="submit">
              <IoMdSend className="size-10 ml-4 hover:text-amber-500" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Page;
