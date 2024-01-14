export default function useModule({ bordered, style, action, title }) {
  return { props: { bordered, style, extra: action, title } }
}
