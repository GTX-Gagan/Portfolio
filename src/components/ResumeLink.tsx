import type { MouseEvent, ReactNode } from 'react';
import { profile } from '../data';

type ClaudeHost = {
  use: (name: string) => Promise<{
    save: (r: { filename: string; data: Blob }) => Promise<{ status: string }>;
  } | null>;
};

/**
 * Downloads the CV. On a normal host this is a plain <a download> link.
 * When the page runs inside a claude.ai Artifact viewer (which blocks plain
 * download links), it hands the PDF to the viewer's save dialog instead.
 */
export default function ResumeLink({
  className,
  children,
  onDone,
}: {
  className?: string;
  children: ReactNode;
  onDone?: () => void;
}) {
  const onClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    const host = (window as unknown as { claude?: ClaudeHost }).claude;
    if (!host?.use) {
      onDone?.();
      return; // normal website: let the browser download it
    }
    e.preventDefault();
    onDone?.();
    try {
      const downloads = await host.use('downloads');
      if (!downloads) return;
      const res = await fetch(profile.resumeUrl);
      const data = await res.blob();
      await downloads.save({ filename: profile.resumeFileName, data });
    } catch {
      /* viewer declined or saving is unavailable here */
    }
  };

  return (
    <a href={profile.resumeUrl} download={profile.resumeFileName} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
