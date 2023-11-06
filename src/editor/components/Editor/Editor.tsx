"use client";

import { useWebContainer } from "@/editor/hooks/useWebContainer";
import { useCallback, useEffect, useRef, useState } from "react";
import { Terminal } from "../Terminal";
import { Xterm } from "@/mods/xterm";
import {
  appTsx,
  indexHtml,
  indexTsx,
  packageJson,
  tsconfigJson,
} from "./file-contents";

export function Editor() {
  const container = useWebContainer();
  const terminalRef = useRef<Xterm>(null);
  const [url, setUrl] = useState<string | null>(null);

  const init = useCallback(
    async function () {
      if (!container || !terminalRef.current) {
        return;
      }

      const xterm = terminalRef.current;

      await container.mount({
        public: {
          directory: {
            "index.html": {
              file: {
                contents: indexHtml,
              },
            },
          },
        },
        src: {
          directory: {
            "App.tsx": {
              file: {
                contents: appTsx,
              },
            },
            "index.tsx": {
              file: {
                contents: indexTsx,
              },
            },
          },
        },
        "package.json": {
          file: {
            contents: packageJson,
          },
        },
        "tsconfig.json": {
          file: {
            contents: tsconfigJson,
          },
        },
      });

      const proc = await container.spawn("jsh", {
        terminal: {
          cols: xterm.cols,
          rows: xterm.rows,
        },
      });

      proc.output.pipeTo(
        new WritableStream({
          write(data) {
            xterm.write(data);
          },
        })
      );

      const input = proc.input.getWriter();
      xterm.onData((data) => {
        input.write(data);
      });

      container.on("server-ready", (port, url) => {
        console.log(url, port);
        setUrl(url);
      });
    },
    [container]
  );

  useEffect(() => {
    if (!container) {
      return;
    }

    init();
  }, [container, init]);

  if (!container) {
    return "booting...";
  }

  return (
    <div>
      {/* <section>
        <h2>Canvas</h2>
        <Canvas />
      </section> */}
      <section>
        <h2>Terminal</h2>
        <Terminal terminalRef={terminalRef} />
      </section>
      <section>
        <h2>Preview</h2>
        {url && <iframe src={url}></iframe>}
      </section>
    </div>
  );
}
