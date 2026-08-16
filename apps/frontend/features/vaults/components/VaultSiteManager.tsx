"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, ExternalLink } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Separator,
  toast,
} from "shadcn-ui";
import { Note } from "@/features/vaults/types/note";

export default function VaultSiteManager({ noteList }: { noteList: Note[] }) {
  return (
    <div className="flex flex-col gap-4">
      {noteList.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{item.label}</CardTitle>
            <Button
              variant="default"
              size="icon"
              onClick={() => window.open(item.url, "_blank", "noreferrer")}
            >
              <ExternalLink />
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <span>{item.username}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(item.username)}
              >
                <Copy />
              </Button>
            </div>
            <div className="flex items-center justify-between gap-2">
              <Password password={item.password} />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(item.password)}
              >
                <Copy />
              </Button>
            </div>
            {item.other.length > 0 && (
              <>
                <Separator />
                {item.other.map((other) => (
                  <div
                    key={other.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span>{other.content}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(other.content)}
                    >
                      <Copy />
                    </Button>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Password({ password }: { password: string }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        value={password}
        readOnly
      />
      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          onClick={() => setShowPassword((v) => !v)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
  toast.add({ title: "Copied!" });
}
