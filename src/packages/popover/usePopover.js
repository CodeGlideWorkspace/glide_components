import useTooltip from './useTooltip'

export default function usePopover({ title, content, ...props }) {
  const { props: aProps } = useTooltip(props)

  return {
    props: {
      ...aProps,
      title,
      content,
    },
  }
}
