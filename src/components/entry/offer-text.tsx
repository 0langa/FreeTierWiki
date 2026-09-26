import { Fragment } from "react";

import { emphasizeNumbers } from "@/lib/format";

export function OfferText({ text }: { text: string }) {
  return (
    <>
      {emphasizeNumbers(text).map((segment, index) =>
        segment.strong ? (
          <b key={index} className="font-semibold text-ink">
            {segment.text}
          </b>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}
