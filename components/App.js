import { TableStructure } from './TableStructure.js';
import { columns, rowHeight } from '../config/columnsConfig.js';
import { fetchData } from '../utils/fetchData.js';

export function App() {
    TableStructure({
        columns,
        rowHeight,
        fetchCallback: fetchData,
    });
}
