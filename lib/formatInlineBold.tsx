import type { ReactNode } from "react";

/**
 * Wrap phrases in **double asterisks** for semibold emphasis.
 * Do not put a raw * inside a ** ** pair (e.g. spell “A* search” outside bold).
 */
export function formatInlineBold(text: string): ReactNode {
  const chunks = text.split(/(\*\*[^*]+\*\*)/g);
  return chunks.map((chunk, i) => {
    const bold = chunk.match(/^\*\*([^*]+)\*\*$/);
    if (bold) {
      return (
        <strong key={i} className="font-semibold text-slate-50">
          {bold[1]}
        </strong>
      );
    }
    return chunk;
  });
}
