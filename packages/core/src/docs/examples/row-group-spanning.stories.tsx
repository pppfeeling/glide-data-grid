import React from "react";

import {
    CompactSelection,
    GridCellKind,
    type GridCell,
    type GridColumn,
    type Item,
} from "../../internal/data-grid/data-grid-types.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";

import { BeautifulWrapper, Description, useMockDataGenerator, defaultProps } 
from "../../data-editor/stories/utils.js";
import { useGridDataProcessing } from "../../data/useGridDataProcessing.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <BeautifulWrapper
                title="Row Group Spanning"
                description={
                    <Description>
                        <p>
                            By providing a <code>rowspan</code> property on cells, the grid can be instructed to merge them
                            visually by omitting the grid lines between them.
                        </p>
                    </Description>
                }>
                <Story />
            </BeautifulWrapper>
        ),
    ],
};

const groupColumn = "Company";

interface Star {
    name: string;
    company: string;
    email: string;
    phone: string;
    address: string;
}

const groupData: Star[] = [
    { name: "Mercury", company: "Sol", email: "mercury@sol.com", phone: "", address: "" },
    { name: "Mercury", company: "Sol", email: "mercury@sol.com", phone: "", address: "" },
    { name: "Mercury", company: "Sol", email: "mercury@sol.com", phone: "", address: "" },
    { name: "Mercury", company: "Sol", email: "mercury@sol.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Sirius", company: "Canis Major", email: "sirius@canismajor.com", phone: "", address: "" },
    { name: "Canopus", company: "Canis Major", email: "canopus@canismajor.com", phone: "", address: "" },
    { name: "Arcturus", company: "Boötes", email: "arcturus@bootes.com", phone: "", address: "" },
    { name: "Vega", company: "Lyra", email: "vega@lyra.com", phone: "", address: "" },
    { name: "Capella", company: "Auriga", email: "capella@auriga.com", phone: "", address: "" },
    { name: "Rigel", company: "Orion", email: "rigel@orion.com", phone: "", address: "" },
    { name: "Procyon", company: "Canis Major", email: "procyon@canisminor.com", phone: "", address: "" },
    { name: "Procyon", company: "zzz", email: "procyon@canisminor.com", phone: "", address: "" },
];

export const RowGroupSpanning = () => {
    

    const customCols = React.useMemo<GridColumn[]>(() => {
        return [
            { title: "Name", id: "name" },
            { title: "Company", id: "company", group: groupColumn },
            { title: "Email", id: "email", group: groupColumn },
        ];
    }, []);

    const { processedData  } = useGridDataProcessing(groupData, {
           // sortState:[{key:'company',order:"asc"}],
           groupingState: ['company'],
            cols:customCols,
        });


    const customGetCellContent = React.useCallback(
        (item: Item): GridCell => {
            const [col, row] = item;
            const dataRow = processedData[row];
           
            const field = customCols[col].id ;
            const data = dataRow[field];

            const basicCell = {
                kind: GridCellKind.Text,
                data: data ?? "",
                allowOverlay: true,
                displayData: data ?? "",
            };

           if (field === "company" && row >= 4 &&  row <= 9) {
              return {
                  ...basicCell,
                  rowspan: [4, 9],
                  rowSpanPosition: "center",
              };
            }

            if (field === "company" && row >= 17 &&  row < 21) {
              return {
                  ...basicCell,
                  rowspan: [17, 21],
              };
            }

         

            return basicCell;
        },
        [customCols, processedData]
    );

    return (
        <DataEditor
            getCellContent={customGetCellContent}
            columns={customCols}
            rows={processedData.length}
            rowMarkers={"number"}
        />
    );
};