export function filterData(allData, columns, searchInput, headerContainer) {
    const query = searchInput.value.trim().toLowerCase();
    const regex = new RegExp(query, "i");
  
    const filtered = allData.filter(row => {
      let matchesSearch = true;
  
      // Search filter
      if (query && !columns.some(col => col.filterable && regex.test(String(row[col.key] ?? "")))) {
        matchesSearch = false;
      }
  
      let matchesColumnFilters = true;
  
      // Column-based dropdown filters
      columns.forEach(col => {
        const select = headerContainer.querySelector(`.${col.key}-filter`);
        if (select) {
          const selectedValue = select.value;
          if (selectedValue !== "All" && selectedValue !== "" && String(row[col.key]) !== selectedValue) {
            matchesColumnFilters = false;
          }
        }
      });
  
      return matchesSearch && matchesColumnFilters;
    });
  
    return filtered;
  }
  