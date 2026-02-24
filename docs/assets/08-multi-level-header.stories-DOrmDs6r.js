import{r as e}from"./iframe-CB3jNLId.js";import{G as C}from"./image-window-loader-DtBhR23y.js";import{D as f}from"./data-editor-all-VbTXgUdc.js";import{S as v}from"./marked.esm-By-yLKzP.js";import{D as L,M as u,H as P,W as I}from"./doc-wrapper-DB41eehh.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./scrolling-data-grid-xxMWlw8S.js";const k={title:"Glide-Data-Grid/Docs",decorators:[a=>e.createElement(v,null,e.createElement(a,null))]},s=[{region:"North America",country:"USA",city:"New York",product:"Laptop",category:"Electronics",sales:1500,quantity:10,profit:300},{region:"North America",country:"USA",city:"Los Angeles",product:"Phone",category:"Electronics",sales:800,quantity:20,profit:160},{region:"North America",country:"Canada",city:"Toronto",product:"Tablet",category:"Electronics",sales:600,quantity:15,profit:90},{region:"Europe",country:"UK",city:"London",product:"Laptop",category:"Electronics",sales:1200,quantity:8,profit:240},{region:"Europe",country:"Germany",city:"Berlin",product:"Phone",category:"Electronics",sales:900,quantity:18,profit:180},{region:"Europe",country:"France",city:"Paris",product:"Tablet",category:"Electronics",sales:700,quantity:12,profit:105},{region:"Asia",country:"Japan",city:"Tokyo",product:"Laptop",category:"Electronics",sales:1800,quantity:12,profit:360},{region:"Asia",country:"Korea",city:"Seoul",product:"Phone",category:"Electronics",sales:1100,quantity:25,profit:220},{region:"Asia",country:"China",city:"Shanghai",product:"Tablet",category:"Electronics",sales:950,quantity:30,profit:142},{region:"North America",country:"USA",city:"Chicago",product:"Monitor",category:"Electronics",sales:450,quantity:5,profit:67},{region:"Europe",country:"Spain",city:"Madrid",product:"Keyboard",category:"Accessories",sales:150,quantity:50,profit:45},{region:"Asia",country:"India",city:"Mumbai",product:"Mouse",category:"Accessories",sales:80,quantity:100,profit:24}],o=()=>{const a=e.useCallback(l=>{const[c,n]=l,t=s[n][["region","country","city","product","category","sales","profit","quantity"][c]],w=typeof t=="number"?t.toLocaleString():t;return{kind:C.Text,allowOverlay:!0,displayData:String(w),data:String(t)}},[]),[M,R]=e.useState([{title:"Region",id:"region",width:120,group:["Location","Geography","Area"]},{title:"Country",id:"country",width:100,group:["Location","Geography","Area"]},{title:"City",id:"city",width:100,group:["Location","Geography","Place"]},{title:"Product",id:"product",width:100,group:["Product Info","Details","Item"]},{title:"Category",id:"category",width:100,group:["Product Info","Details","Item"]},{title:"Sales",id:"sales",width:100,group:["Financial","Metrics","Revenue"]},{title:"Profit",id:"profit",width:100,group:["Financial","Metrics","Revenue"]},{title:"Quantity",id:"quantity",width:80,group:["Financial","Metrics","Volume"]}]),[y,m]=e.useState([{title:"Region",id:"region",width:120,group:["Financial","Area"]},{title:"Country",id:"country",width:100,group:["Financial","Area"]},{title:"City",id:"city",width:100,group:["Financial","Place"]},{title:"Product",id:"product",width:100,group:["Financial","Item"]},{title:"Category",id:"category",width:100,group:["Financial","Item"]},{title:"Sales",id:"sales",width:100,group:["Financial","Revenue"]},{title:"Profit",id:"profit",width:100,group:["Financial","Revenue"]},{title:"Quantity",id:"quantity",width:80,group:["Financial","Volume"]}]),h=e.useCallback((l,c)=>{m(n=>{const i=n.findIndex(t=>t.id===l.id);if(i===-1)return n;const r=[...n];return r[i]={...r[i],width:c},r})},[]);return e.createElement(L,null,e.createElement(u,null,`
# Multi-Level Column Grouping

Columns can now have multiple levels of grouping by using an array of strings for the \`group\` property.
This creates a hierarchical header structure with multiple rows of group headers.

## Usage

Instead of a single string, provide an array of group names from top level to bottom level:

\`\`\`typescript
group: ["Top Level", "Middle Level", "Bottom Level"]
\`\`\`

The array index corresponds to the header level:
- Index 0 = Topmost group header row
- Index 1 = Second group header row
- Index n = nth group header row

Columns with the same group values at each level will be visually grouped together.

**Note:** You can resize columns by dragging the column header borders.
`),e.createElement(P,null,`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Region",
            id: "region",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "Country",
            id: "country",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "City",
            id: "city",
            group: ["Location", "Geography", "Place"],
        },
        {
            title: "Product",
            id: "product",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Category",
            id: "category",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Sales",
            id: "sales",
            group: ["Financial", "Metrics", "Revenue"],
        },
        {
            title: "Quantity",
            id: "quantity",
            group: ["Financial", "Metrics", "Volume"],
        },
        {
            title: "Profit",
            id: "profit",
            group: ["Financial", "Metrics", "Revenue"],
        },
    ];
}, []);
`),e.createElement(u,null,`
## Expected Header Structure

\`\`\`
┌────────────────────────────────┬────────────────────────┬──────────────────────────────┐
│          Location              │     Product Info       │          Financial           │  ← Level 0
├────────────────────────────────┼────────────────────────┼──────────────────────────────┤
│          Geography             │        Details         │           Metrics            │  ← Level 1
├───────────────────────┬────────┼────────────────────────┼─────────────────┬────────────┤
│          Area         │ Place  │          Item          │     Revenue     │   Volume   │  ← Level 2
├─────────┬─────────────┼────────┼───────────┬────────────┼────────┬────────┼────────────┤
│ Region  │   Country   │  City  │  Product  │  Category  │ Sales  │ Profit │  Quantity  │  ← Column Headers
└─────────┴─────────────┴────────┴───────────┴────────────┴────────┴────────┴────────────┘
\`\`\`

## Backward Compatibility

The existing single-string \`group\` property still works:

\`\`\`typescript
{ title: "Name", group: "Personal" }  // Still works!
\`\`\`
`),e.createElement(I,{height:300},e.createElement(f,{getCellContent:a,columns:y,rows:s.length,onColumnResize:h})))};o.storyName="08. Multi-Level Header";var d,p,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => {
  const getContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const dataRow = data[row];
    const indexes: (keyof SalesData)[] = ["region", "country", "city", "product", "category", "sales", "profit", "quantity"];
    const d = dataRow[indexes[col]];
    const displayValue = typeof d === "number" ? d.toLocaleString() : d;
    return {
      kind: GridCellKind.Text,
      allowOverlay: true,
      displayData: String(displayValue),
      data: String(d)
    };
  }, []);

  // Multi-level group headers using array syntax
  // Level 0 (top): "Location" or "Product Info" or "Financial"
  // Level 1 (middle): "Geography", "Details", "Metrics"
  // Level 2 (bottom): specific group names
  const [columns1, setColumns11] = React.useState<GridColumn[]>([{
    title: "Region",
    id: "region",
    width: 120,
    group: ["Location", "Geography", "Area"]
  }, {
    title: "Country",
    id: "country",
    width: 100,
    group: ["Location", "Geography", "Area"]
  }, {
    title: "City",
    id: "city",
    width: 100,
    group: ["Location", "Geography", "Place"]
  }, {
    title: "Product",
    id: "product",
    width: 100,
    group: ["Product Info", "Details", "Item"]
  }, {
    title: "Category",
    id: "category",
    width: 100,
    group: ["Product Info", "Details", "Item"]
  }, {
    title: "Sales",
    id: "sales",
    width: 100,
    group: ["Financial", "Metrics", "Revenue"]
  }, {
    title: "Profit",
    id: "profit",
    width: 100,
    group: ["Financial", "Metrics", "Revenue"]
  }, {
    title: "Quantity",
    id: "quantity",
    width: 80,
    group: ["Financial", "Metrics", "Volume"]
  }]);
  const [columns, setColumns] = React.useState<GridColumn[]>([{
    title: "Region",
    id: "region",
    width: 120,
    group: ["Financial", "Area"]
  }, {
    title: "Country",
    id: "country",
    width: 100,
    group: ["Financial", "Area"]
  }, {
    title: "City",
    id: "city",
    width: 100,
    group: ["Financial", "Place"]
  }, {
    title: "Product",
    id: "product",
    width: 100,
    group: ["Financial", "Item"]
  }, {
    title: "Category",
    id: "category",
    width: 100,
    group: ["Financial", "Item"]
  }, {
    title: "Sales",
    id: "sales",
    width: 100,
    group: ["Financial", "Revenue"]
  }, {
    title: "Profit",
    id: "profit",
    width: 100,
    group: ["Financial", "Revenue"]
  }, {
    title: "Quantity",
    id: "quantity",
    width: 80,
    group: ["Financial", "Volume"]
  }]);

  // Column resize handler
  const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
    setColumns(prevCols => {
      const index = prevCols.findIndex(c => c.id === column.id);
      if (index === -1) return prevCols;
      const newCols = [...prevCols];
      newCols[index] = {
        ...newCols[index],
        width: newSize
      };
      return newCols;
    });
  }, []);
  return <DocWrapper>
            <Marked>
                {\`
# Multi-Level Column Grouping

Columns can now have multiple levels of grouping by using an array of strings for the \\\`group\\\` property.
This creates a hierarchical header structure with multiple rows of group headers.

## Usage

Instead of a single string, provide an array of group names from top level to bottom level:

\\\`\\\`\\\`typescript
group: ["Top Level", "Middle Level", "Bottom Level"]
\\\`\\\`\\\`

The array index corresponds to the header level:
- Index 0 = Topmost group header row
- Index 1 = Second group header row
- Index n = nth group header row

Columns with the same group values at each level will be visually grouped together.

**Note:** You can resize columns by dragging the column header borders.
\`}
            </Marked>
            <Highlight>
                {\`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Region",
            id: "region",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "Country",
            id: "country",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "City",
            id: "city",
            group: ["Location", "Geography", "Place"],
        },
        {
            title: "Product",
            id: "product",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Category",
            id: "category",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Sales",
            id: "sales",
            group: ["Financial", "Metrics", "Revenue"],
        },
        {
            title: "Quantity",
            id: "quantity",
            group: ["Financial", "Metrics", "Volume"],
        },
        {
            title: "Profit",
            id: "profit",
            group: ["Financial", "Metrics", "Revenue"],
        },
    ];
}, []);
\`}
            </Highlight>
            <Marked>
                {\`
## Expected Header Structure

\\\`\\\`\\\`
┌────────────────────────────────┬────────────────────────┬──────────────────────────────┐
│          Location              │     Product Info       │          Financial           │  ← Level 0
├────────────────────────────────┼────────────────────────┼──────────────────────────────┤
│          Geography             │        Details         │           Metrics            │  ← Level 1
├───────────────────────┬────────┼────────────────────────┼─────────────────┬────────────┤
│          Area         │ Place  │          Item          │     Revenue     │   Volume   │  ← Level 2
├─────────┬─────────────┼────────┼───────────┬────────────┼────────┬────────┼────────────┤
│ Region  │   Country   │  City  │  Product  │  Category  │ Sales  │ Profit │  Quantity  │  ← Column Headers
└─────────┴─────────────┴────────┴───────────┴────────────┴────────┴────────┴────────────┘
\\\`\\\`\\\`

## Backward Compatibility

The existing single-string \\\`group\\\` property still works:

\\\`\\\`\\\`typescript
{ title: "Name", group: "Personal" }  // Still works!
\\\`\\\`\\\`
\`}
            </Marked>
            <Wrapper height={300}>
                <DataEditor getCellContent={getContent} columns={columns} rows={data.length} onColumnResize={onColumnResize} />
            </Wrapper>
        </DocWrapper>;
}`,...(g=(p=o.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const q=["MultiLevelHeader"];export{o as MultiLevelHeader,q as __namedExportsOrder,k as default};
