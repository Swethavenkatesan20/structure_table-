import { TableProperties } from './Table.js';

function createTopBar() {
    const topBar = document.createElement("div");
    topBar.className = "top-bar";

    const controls = document.createElement("div");
    controls.className = "controls";

    const search = document.createElement("input");
    search.id = "search";
    search.placeholder = "Search...";

    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-filters";
    resetBtn.textContent = "Reset Filters";

    const clearSortBtn = document.createElement("button");
    clearSortBtn.id = "clear-sort";
    clearSortBtn.textContent = "Clear Sort";

    controls.appendChild(search);
    controls.appendChild(resetBtn);
    controls.appendChild(clearSortBtn);
    topBar.appendChild(controls);

    return { topBar, search, resetBtn, clearSortBtn };
}

function createTableContainers() {
    const tableContainer = document.createElement("section");
    tableContainer.id = "table-container";

    const tableHeader = document.createElement("div");
    tableHeader.id = "table-header";
    tableHeader.className = "header-row";

    const tableBody = document.createElement("div");
    tableBody.id = "table-body";

    tableContainer.appendChild(tableHeader);
    tableContainer.appendChild(tableBody);

    return { tableContainer, tableHeader, tableBody };
}

export function TableStructure({ columns, rowHeight, fetchCallback }) {
    const container = document.createElement("div");
    container.className = "app-wrapper";

    const { topBar, search, resetBtn, clearSortBtn } = createTopBar();
    const { tableContainer, tableHeader, tableBody } = createTableContainers();

    container.appendChild(topBar);
    container.appendChild(tableContainer);
    document.body.appendChild(container);

    TableProperties({
        columns,
        rowHeight,
        searchInput: search,
        resetButton: resetBtn,
        clearSortButton: clearSortBtn,
        headerContainer: tableHeader,
        bodyContainer: tableBody,
        fetchCallback,
        //tableContainer,
    });
}
