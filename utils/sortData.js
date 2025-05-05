export function sortData(data, columns, sortKey, sortOrder) {

  //console.log(sortKey);
  
    if (!sortKey) return data; // No sorting applied
  
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data; // If invalid column key, return unsorted
  
    return [...data].sort((a, b) => {
      const valA = a[sortKey] ?? col.defaultValue;
      const valB = b[sortKey] ?? col.defaultValue;
  
      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * sortOrder;
      }
  
      return String(valA).localeCompare(String(valB)) * sortOrder;
    });
  }
  