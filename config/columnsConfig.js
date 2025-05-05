export const columns = [
  
  {
    key: 'id',
    label: 'ID',
    sortable: true,
    filterable: true,
    filterIcon: './asset/magnifying-glass.png',
    width: '5%',         // default width as percentage
    minWidth: '5%',      // min width as percentage
    maxWidth: '10%',     // max width as percentage
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
    filterIcon: './asset/magnifying-glass.png',

    width: '30%',        // default width as percentage
    minWidth: '15%',     // min width as percentage
    maxWidth: '35%',     // max width as percentage
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  {
    key: 'age',
    label: 'Age',
    sortable: true,
    filterable: true,
    filterIcon: './asset/magnifying-glass.png',

    width: '20%',        // default width as percentage
    minWidth: '15%',     // min width as percentage
    maxWidth: '25%',     // max width as percentage
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  {
    key: 'city',
    label: 'City',
    sortable: true,
    filterable: false,
    filterIcon: './asset/magnifying-glass.png',

    width: '20%',        // default width as percentage
    minWidth: '15%',     // min width as percentage
    maxWidth: '30%',     // max width as percentage
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  {
    key: 'score',
    label: 'Score',
    sortable: true,
    filterable: false,
    filterIcon: './asset/magnifying-glass.png',

    width: '10%',        // default width as percentage
    minWidth: '10%',      // min width as percentage
    maxWidth: '15%',     // max width as percentage
    defaultValue: '-',
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  {
    key: 'gender',
    label: 'Gender',
    sortable: false,
    filterable: true,
    filterIcon: './asset/magnifying-glass.png',

    width: '15%',        // default width as percentage
    minWidth: '10%',     // min width as percentage
    maxWidth: '20%',     // max width as percentage
    defaultValue: 'NA',
    filterOptions: [
      { label: "All", value: "All" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "N/A", value: "NA" }
    ], // Custom options for gender filtering
    sortIcons: {
      default: './asset/sort_default.png',
      asc: './asset/sort-up.png',
      desc: './asset/caret-down.png'
    }
  },
  //  {
  //   key: 'batch',
  //    label: 'batch',
  //    sortable: true,
  //    filterable: false,
  //    width: '10%',
  //  }
  

];
export const rowHeight = 40;