export default function useModule({ bordered = true, actions, title }) {
  return { props: { bordered, extra: actions, title } }
}
