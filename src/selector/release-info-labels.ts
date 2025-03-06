export const ReleaseInfoLabelsNode = () => {
  const nodes = document.querySelectorAll<HTMLTableCellElement>('.info_hdr')

  if (!nodes.length) throw new Error('Release info labels not found')

  return nodes
}
