import { getSortIcon } from '../utils/getSortIcon.js';
import { debounce } from '../utils/debounce.js';
//import { filterData } from '../utils/filterData.js';



export function TableHeader({ columns, headerContainer, searchInput, resetButton, clearSortButton, state, applyFilter, renderVirtualRows }) {
  headerContainer.innerHTML = "";

  const columnWidths = columns.map(col => {
    const minWidth = col.minWidth || col.width;
    const maxWidth = col.maxWidth || col.width;
    return `minmax(${minWidth}, ${maxWidth})`;
  }).join(' ');

  headerContainer.style.display = "grid";
  headerContainer.style.gridTemplateColumns = columnWidths;

  columns.forEach(col => {
    const cell = document.createElement("div");
    cell.className = "column";

    const labelDiv = document.createElement("div");
    labelDiv.className = "column-label";
    labelDiv.textContent = col.label;

    cell.appendChild(labelDiv);

    if (col.filterOptions?.length) {
      const select = document.createElement("select");
      select.className = `column-filter ${col.key}-filter`;

      col.filterOptions.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.label;
        select.appendChild(opt);
      });

      select.addEventListener("change", () => {
        applyFilter();
        renderVirtualRows();
      });

      labelDiv.appendChild(select);
    }

    if (col.sortable) {
      cell.classList.add("sortable");

      const icon = document.createElement("img");
      icon.className = "sort-icon";
      icon.src = getSortIcon(col, state.sortKey, state.sortOrder);
      icon.alt = "sort";

      labelDiv.appendChild(icon);

      cell.addEventListener("click", (e) => {
        if (e.target.tagName === 'SELECT') return;

        if (state.sortKey === col.key) {
          state.sortOrder *= -1;
        } else {
          state.sortKey = col.key;
          state.sortOrder = 1;
        }

        if (col.sortIcons && icon) {
          icon.src = state.sortKey !== col.key
            ? col.sortIcons.default
            : state.sortOrder === 1
              ? col.sortIcons.asc
              : col.sortIcons.desc;
        }

        renderVirtualRows();
      });
    }

    headerContainer.appendChild(cell);
  });

  // Event listeners
  resetButton.addEventListener("click", () => {
    searchInput.value = "";

    columns.forEach(col => {
      const select = headerContainer.querySelector(`.${col.key}-filter`);
      if (select) select.value = "";
    });

    state.filteredData = state.allData;
    renderVirtualRows();
  });

  clearSortButton.addEventListener("click", () => {
    state.sortKey = null;
    state.sortOrder = 1;
    TableHeader({ columns, headerContainer, searchInput, resetButton, clearSortButton, state, applyFilter, renderVirtualRows });
    renderVirtualRows();
  });

  searchInput.addEventListener("input", debounce(() => {
    applyFilter();
    renderVirtualRows();
  }, 300));
}
