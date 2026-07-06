import { useEffect } from "react";
import { useState } from "react";
import type { MessageType } from "./types/message";
import Message from "./components/Message";
import "./App.css";

const default_messages: MessageType[] = [
  {
    id: 0,
    author_name: "Антон",
    content: "Привет! Как дела?",
    from_self: false,
    color: "green",
  },
  {
    id: 1,
    author_name: "Сергей",
    content: "Отлично! Пока живой",
    from_self: false,
    color: "blue",
  },
  {
    id: 2,
    author_name: "Антон",
    content: "Не хочешь завтра поехать на шашлыки?",
    from_self: false,
  },
  { id: 3, author_name: "Сергей", content: "Отличная идея", from_self: false },
];

function App() {
  const [new_message, set_new_message] = useState("");
  const [messages, set_messages] = useState(default_messages);
  const [msg_counter, set_msg_counter] = useState(4);
  const messages_layout = messages.map((msg) => {
    return (
      <Message
        align={(msg.from_self) ? "flex-end" : "flex-start"}
        bg_color={msg.color}
        key={msg.id}
        author_name={msg.author_name}
        content={msg.content}
      />
    );
  });

  return (
    <div>
      <div className="app-container">{messages_layout}</div>
      <div style={{ marginTop: 30 }} className="app-container">
        {/* {messages
          .filter((msg) => msg.author_name == "Антон")
          .map((msg) => {
            return (
              <Message
                key={msg.id}
                author_name={msg.author_name}
                content={msg.content}
              ></Message>
            );
          })} */}
      </div>
      <div className="send-container">
        <input
          onInput={(ev) => set_new_message(ev.target.value)}
          value={new_message}
        ></input>
        <button
          onClick={() => {
            set_messages([
              ...messages,
              {
                id: 4,
                author_name: "Test",
                content: new_message,
                from_self: true,
              },
            ]);
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export default App;
