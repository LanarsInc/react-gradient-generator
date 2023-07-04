export const SectionAppearAnimation = {
  initial: { scale: 0 },
  animate: { scale: [0, 1.05, 1] },
  transition: (delay = 0) => ({
    delay,
    times: [0, 0.75, 1],
    duration: 1,
    ease: 'easeInOut',
  }),
};
