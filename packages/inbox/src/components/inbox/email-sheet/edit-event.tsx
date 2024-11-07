import { EditEvent, ThreadValues } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToolCall } from "@langchain/core/messages/tool";
import { Thread } from "@langchain/langgraph-sdk";

interface EditEventProps {
  thread: Thread<ThreadValues>;
  event: EditEvent;
  handleSubmit: (values: Record<string, any>) => Promise<void>;
}

export function EditEventComponent({ event, handleSubmit }: EditEventProps) {
  const toolCall = event.tool_call || (event.metadata as ToolCall);

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>(
    toolCall?.args?.[event.target_field] || ""
  );
  console.log("interruptValue", event);
  const submit = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoading(true);

    const removeMessage = {
      role: "remove",
      id: event.message_id,
      content: null,
    };
    const newAIMessage = {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: toolCall.id,
          name: toolCall.name,
          args: {
            ...toolCall.args,
            [event.target_field]: response,
          },
        },
      ],
    };
    await handleSubmit({
      messages: [removeMessage, newAIMessage],
    });
    setLoading(false);
    setResponse("");
  };

  const ignore = () => {
    console.log("ignore");
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 items-start justify-start"
    >
      <p className="text-sm text-gray-600">{event.message}</p>
      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        disabled={loading}
      />
      <div className="flex gap-2">
        <Button disabled={loading} type="submit" onClick={submit}>
          Send
        </Button>
        <Button
          disabled={loading}
          type="button"
          variant="secondary"
          onClick={ignore}
        >
          Ignore
        </Button>
      </div>
    </form>
  );
}
