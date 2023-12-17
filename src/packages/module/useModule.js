export default function useModule({ bordered, style, action, title }) {
  return { props: { style, bordered, extra: action, title } }
}
