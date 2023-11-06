"use client";

import { Xterm } from "@/mods/xterm";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import "xterm/css/xterm.css";

export type TerminalProps = {
  terminalRef?: MutableRefObject<Xterm | null>;
};

export function Terminal(props: TerminalProps) {
  const { terminalRef } = props;

  const terminal = useMemo(() => new Xterm(), []);
  const attached = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (attached.current) {
      return;
    }

    terminal.open(ref.current);
    attached.current = true;

    if (terminalRef) {
      terminalRef.current = terminal;
    }
  }, [attached, terminal, terminalRef]);

  return <div ref={ref}></div>;
}
