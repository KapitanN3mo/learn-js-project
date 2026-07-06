import type { MessageType } from "../types/message";

export default function Message({ author_name, content }) {
  return (
    <div className="message-container">
      <div>{author_name}</div>
      <div className="message-content">{content}</div>
    </div>
  );
}
