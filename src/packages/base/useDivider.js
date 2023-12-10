function useDivider({ style, className, dashed, orientation, offset, layout }) {
  return { props: { style, className, dashed, orientation, orientationMargin: offset, type: layout } }
}

export default useDivider
