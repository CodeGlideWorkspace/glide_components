import { isObject } from 'remote:glide_components/utils'

export default function useParseRemote(remoteDefinition) {
  if (!remoteDefinition) {
    return {}
  }

  return {
    path: isObject(remoteDefinition) ? remoteDefinition.path : remoteDefinition,
    exportName: isObject(remoteDefinition) ? remoteDefinition.exportName : 'default',
  }
}
