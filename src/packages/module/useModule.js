export default function useModule({ bordered, style, actions, title }) {
  return { props: { style, bordered, extra: actions, title } }
}
