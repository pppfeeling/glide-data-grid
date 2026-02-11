import{R as e}from"./iframe-BcE-c1gF.js";import{D as M}from"./data-editor-all-8E4Os2vs.js";import{B as x,D as y,P as D,M as $,u as v,d as G}from"./utils-KXRDGTSC.js";import{G as K}from"./image-window-loader-BfgbiBNy.js";import{S as I}from"./story-utils-D7lIIpsB.js";import"./preload-helper-C1FmrZbK.js";import"./index-CwcCJ_pG.js";import"./throttle-DiOeTwrO.js";import"./flatten-BzRjj1qx.js";import"./scrolling-data-grid-SYG2q29G.js";import"./marked.esm-Cm6jhINK.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const F={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(I,null,e.createElement(x,{title:"Custom Validation with onCellEdited",description:e.createElement(e.Fragment,null,e.createElement(y,null,"This story demonstrates custom cell validation directly within the ",e.createElement(D,null,"onCellEdited")," callback, including error highlighting."),e.createElement($,null,e.createElement("ul",null,e.createElement("li",null,e.createElement("b",null,"Number Column:")," Only accepts numeric input."),e.createElement("li",null,e.createElement("b",null,"Email Column:")," Validates for a basic email format."),e.createElement("li",null,e.createElement("b",null,"Text Column:")," Coerces input to uppercase."))))},e.createElement(n,null)))]},a=()=>{const{cols:n,getCellContent:u,setCellValue:m}=v(60,!1),[C,p]=e.useState(new Map),o=e.useMemo(()=>[{...n[0],title:"Number Column",id:"number"},{...n[1],title:"Email Column",id:"email"},{...n[2],title:"Text Column",id:"text"},...n.slice(3)],[n]),h=e.useCallback((l,t)=>{const[r,s]=l,i=o[r].id,f=`${r}-${s}`;let c=!0,E=t;if(t.kind===K.Text)switch(i){case"number":/^-?\d*\.?\d*$/.test(t.data)||(c=!1);break;case"email":/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(t.data)||(c=!1);break;case"text":t.data!==t.data.toUpperCase()&&(E={...t,data:t.data.toUpperCase()});break}if(m(l,E),!c){p(d=>new Map(d).set(f,"Invalid input"));return}p(d=>{const w=new Map(d);return w.delete(f),w})},[m,o]),k=e.useCallback(l=>{const t=u(l),[r,s]=l,i=`${r}-${s}`;return C.has(i)?{...t,themeOverride:{bgCell:"#fee",textDark:"#c00"}}:t},[u,C]);return e.createElement(M,{...G,getCellContent:k,columns:o,rowMarkers:"both",onPaste:!0,onCellEdited:h,rows:100})};var b,V,g;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(60, false);
  const [errors, setErrors] = React.useState<Map<string, string>>(new Map());
  const customCols = React.useMemo(() => [{
    ...cols[0],
    title: "Number Column",
    id: "number"
  }, {
    ...cols[1],
    title: "Email Column",
    id: "email"
  }, {
    ...cols[2],
    title: "Text Column",
    id: "text"
  }, ...cols.slice(3)], [cols]);
  const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;
    const columnId = customCols[col].id;
    const errorKey = \`\${col}-\${row}\`;
    let isValid = true;
    let finalValue: EditableGridCell = newValue;
    if (newValue.kind === GridCellKind.Text) {
      // Only validate text cells
      switch (columnId) {
        case "number":
          if (!/^-?\\d*\\.?\\d*$/.test(newValue.data)) {
            isValid = false;
          }
          break;
        case "email":
          if (!/^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,6}$/.test(newValue.data)) {
            isValid = false;
          }
          break;
        case "text":
          if (newValue.data !== newValue.data.toUpperCase()) {
            finalValue = {
              ...newValue,
              data: newValue.data.toUpperCase()
            };
          }
          break;
        default:
          // No specific validation for other columns
          break;
      }
    }
    setCellValue(cell, finalValue);
    if (!isValid) {
      // Validation failed, add error and ignore change
      setErrors(prev => new Map(prev).set(errorKey, "Invalid input"));
      return;
    }

    // Clear error if any
    setErrors(prev => {
      const newErrors = new Map(prev);
      newErrors.delete(errorKey);
      return newErrors;
    });
  }, [setCellValue, customCols]);
  const getCellContentWithValidation = React.useCallback((cell: Item): GridCell => {
    const content = getCellContent(cell);
    const [col, row] = cell;
    const errorKey = \`\${col}-\${row}\`;
    if (errors.has(errorKey)) {
      return {
        ...content,
        themeOverride: {
          bgCell: "#fee",
          textDark: "#c00"
        }
      };
    }
    return content;
  }, [getCellContent, errors]);
  return <DataEditor {...defaultProps} getCellContent={getCellContentWithValidation} columns={customCols} rowMarkers={"both"} onPaste={true} onCellEdited={onCellEdited} rows={100} />;
}`,...(g=(V=a.parameters)==null?void 0:V.docs)==null?void 0:g.source}}};const j=["CustomValidation"];export{a as CustomValidation,j as __namedExportsOrder,F as default};
