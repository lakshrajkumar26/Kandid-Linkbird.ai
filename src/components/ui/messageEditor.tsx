"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type MessageField = "text" | "delay";

type MessageProps = {
  id: string;
  title: string;
  text: string;
  delay?: string;
  placeholder?: string;
  onChange: (field: "text" | "delay", value: string) => void;
  
  onSave?: () => void;
  onPreview?: () => void;
};


export function MessageEditor({ id, title, text, delay, onChange,placeholder, onSave, onPreview }: MessageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={text}
          onChange={(e) => onChange("text", e.target.value)}
          className="mb-4"
          placeholder={`Edit your ${title.toLowerCase()} here...`}
          rows={4}
        />

        {/* Show delay selector only for follow-ups */}
        {id !== "connection" && (
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm">Send</span>
            <Select
              value={delay ?? ""}
              onValueChange={(val) => onChange("delay", val)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Select delay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 day">1 day</SelectItem>
                <SelectItem value="2 days">2 days</SelectItem>
                <SelectItem value="3 days">3 days</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">
              After previous message
            </span>
          </div>
        )}

        <div className="flex space-x-2">
         <Button variant="outline" onClick={onPreview}>Preview</Button>
  <Button onClick={onSave}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
