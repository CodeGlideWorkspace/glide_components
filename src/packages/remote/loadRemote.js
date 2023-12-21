import { loadRemoteModule } from 'doer'

export default function loadRemote(path) {
  /**
   * path的格式案例
   *
   * remote:[scope][module]
   *
   * eg: remote:glide_components/Input
   *
   * scope => glide_component
   * module => ./Input
   */
  const [scope, ...parts] = path.replace('remote:', '').split('/')
  const module = `./${parts.filter(Boolean).join('/')}`

  return loadRemoteModule(scope, module)
}
