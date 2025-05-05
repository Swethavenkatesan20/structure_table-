import { TableHeader } from './TableHeader.js';
import { TableBody } from './TableBody.js';
import { filterData } from '../utils/filterData.js';

export function TableProperties({ columns, rowHeight, searchInput, resetButton, clearSortButton, headerContainer, bodyContainer, fetchCallback }) {
  const tableContainer = document.getElementById("table-container");

  // Shared state
  const state = {
    allData: [],
    filteredData: [],
    sortKey: null,
    sortOrder: 1,
    offset: 0,
    limit: 100,
    isFetching: false
  };

  
  // Initialize header and body
  const applyFilter = () => {
    state.filteredData = filterData(state.allData, columns, searchInput, headerContainer);
  };


  const renderVirtualRows = () => {
    TableBody.render({
      columns,
      rowHeight,
      bodyContainer,
      tableContainer,
      state
    });
  };

  TableHeader({
    columns,
    headerContainer,
    searchInput,
    resetButton,
    clearSortButton,
    state,
    applyFilter,
    renderVirtualRows
  });

  TableBody.init({
    columns,
    rowHeight,
    bodyContainer,
    tableContainer,
    fetchCallback,
    state,
    applyFilter,
    renderVirtualRows
  });
}
