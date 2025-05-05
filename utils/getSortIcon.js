export function getSortIcon(col, sortKey, sortOrder) {
    if (!col.sortIcons) return '';
    if (sortKey !== col.key) return col.sortIcons.default;
    return sortOrder === 1 ? col.sortIcons.asc : col.sortIcons.desc;
  }
  