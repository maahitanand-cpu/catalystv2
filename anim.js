import { useRef } from "react";
import { useInView } from "framer-motion";

export function useInViewOnce(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

export const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] } },
});

export const stagger = {
  animate: { transition: { staggerChildren: 0.11 } },
};

export const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
