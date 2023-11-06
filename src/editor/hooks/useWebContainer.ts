import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

export function useWebContainer() {
  // const [loading, setLoading] = useState(false);
  const [container, setContainer] = useState<WebContainer | null>(null);

  async function bootContainer() {
    try {
      const container = await WebContainer.boot();

      setContainer(container);
    } catch {
      /* only a single WebContainer instance can be booted */
    }
  }

  useEffect(() => {
    bootContainer();
  }, []);

  return container;
}
