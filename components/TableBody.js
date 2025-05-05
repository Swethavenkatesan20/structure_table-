import { renderCell } from './CellRenderer.js';
import { sortData } from '../utils/sortData.js';
import { debounce } from '../utils/debounce.js';
import { throttle } from '../utils/throttle.js';
import { filterData } from '../utils/filterData.js';


export const TableBody = {
  rowPool: [],
  //rowHeight: 0,

  init({ columns, rowHeight, bodyContainer, tableContainer, fetchCallback, state, applyFilter, renderVirtualRows }) {
    this.rowHeight = rowHeight;
    this.columns = columns;
    this.bodyContainer = bodyContainer;
    this.tableContainer = tableContainer;
    this.state = state;

    this.bodyContainer.style.paddingTop = "0px";
    this.bodyContainer.style.paddingBottom = "0px";

    this.initializeRowPool();

    tableContainer.addEventListener("scroll", throttle(() => {
      this.render({ columns, rowHeight, bodyContainer, tableContainer, state });
      this.loadMore(fetchCallback);
    }, 100));
    

    this.loadMore(fetchCallback);
  },

  async loadMore(fetchCallback) {
    const { offset, limit, isFetching } = this.state;

    if (isFetching) return;
    if (this.tableContainer.scrollHeight - this.tableContainer.scrollTop > this.tableContainer.clientHeight + 100) return;

    this.state.isFetching = true;
    const newData = await fetchCallback(offset, limit);
    this.state.allData = [...this.state.allData, ...newData];
    this.state.filteredData = this.state.allData;
    this.state.offset += limit;
    this.state.isFetching = false;

    this.render({ columns: this.columns, rowHeight: this.rowHeight, bodyContainer: this.bodyContainer, tableContainer: this.tableContainer, state: this.state });
  },

  initializeRowPool() {
    const totalVisibleRows = Math.ceil(this.tableContainer.clientHeight / this.rowHeight) + 10;
    console.log(totalVisibleRows);
    

    for (let i = 0; i < totalVisibleRows; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      rowDiv.style.display = "grid";
      rowDiv.style.gridTemplateColumns = this.columns.map(col => `minmax(${col.minWidth || col.width}, ${col.maxWidth || col.width})`).join(" ");
      rowDiv.style.height = `${this.rowHeight}px`;
      this.bodyContainer.appendChild(rowDiv);
      this.rowPool.push(rowDiv);
    }
  },

  render({ columns, rowHeight, bodyContainer, tableContainer, state }) {
    const scrollTop = tableContainer.scrollTop;
    const viewportHeight = tableContainer.clientHeight;
    const visibleCount = Math.ceil(viewportHeight / rowHeight);
    const buffer = 5;

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
    const endIndex = Math.min(state.filteredData.length, startIndex + visibleCount + buffer * 2);

    const dataToRender = sortData(state.filteredData, columns, state.sortKey, state.sortOrder);

    this.rowPool.forEach((row, i) => {
      const dataIndex = startIndex + i;
      const rowData = dataToRender[dataIndex];

      if (rowData) {
        row.style.display = "grid";
        row.style.top = `${dataIndex * rowHeight}px`;

        columns.forEach((col, colIndex) => {
          let cell = row.children[colIndex];
          if (!cell) {
            cell = document.createElement("div");
            cell.className = "column";
            row.appendChild(cell);
          }

          const content = renderCell(col.key, rowData[col.key], col.defaultValue);
          cell.textContent = content;
          cell.setAttribute("data-label", content);
        });
      } else {
        row.style.display = "none";
      }
    });

    bodyContainer.style.paddingTop = `${startIndex * rowHeight}px`;
    bodyContainer.style.paddingBottom = `${(state.filteredData.length - endIndex) * rowHeight}px`;
  }
};
