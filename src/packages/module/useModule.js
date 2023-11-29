export default function useModule({ bordered, actions, title }) {
  return { props: { bordered, extra: actions, title } }
}
