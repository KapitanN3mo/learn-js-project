import type { MessageType } from "../types/message";

export default function Message({ author_name, content, bg_color, align }) {
  return (
    <div
      style={{ backgroundColor: bg_color, alignSelf: align }}
      className="message-container"
    >
      <div>{author_name}</div>
      <div className="message-content">{content}</div>
    </div>
  );
}
