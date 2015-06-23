/*!
* Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
define(["module"], function(module) {
  var O_hasOwn = Object.prototype.hasOwnProperty;

  var instanceModule = getModuleBaseId(module.id) + "/vizFactory";

  return /** @type IVizTypeProvider */{
    getAll: getCccVizTypes
  };

  function getModuleBaseId(moduleId) {
    var index = moduleId.lastIndexOf("/");
    return index < 0 ? "." : moduleId.substr(0, index);
  }

  function getCccVizTypes() {
    return [
      {
        id:       "ccc_bar",
        type:     "barchart",
        source:   "CCC",
        name:     vizLabel("VERTICAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("VERTICAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors: ["none", "center", "inside_end", "inside_base", "outside_end"]
            }),
            createTrendsDataReqs({separator: true}),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 100
      },
      {
        id:       "ccc_barstacked",
        type:     "barchart",
        source:   "CCC",
        name:     vizLabel("STACKED_VERTICAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("STACKED_VERTICAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors: ["none", "center", "inside_end", "inside_base"]
            }),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 110
      },
      {
        id:       "ccc_horzbar",
        type:     "horzbarchart",
        source:   "CCC",
        name:     vizLabel("HORIZONTAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("HORIZONTAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors: ["none", "center", "inside_end", "inside_base", "outside_end"]
            }),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 130,
        menuSeparator: true
      },
      {
        id:       "ccc_horzbarstacked",
        type:     "horzbarchart",
        source:   "CCC",
        name:     vizLabel("STACKED_HORIZONTAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("STACKED_HORIZONTAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors: ["none", "center", "inside_end", "inside_base"]
            }),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 140
      },
      {
        id:       "ccc_barnormalized",
        type:     "barchart",
        source:   "CCC",
        name:     vizLabel("PCT_STACKED_VERTICAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("PCT_STACKED_VERTICAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors:   ["none", "center", "inside_end", "inside_base"]
            }),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 120
      },
      {
        id:       "ccc_horzbarnormalized",
        type:     "horzbarchart",
        source:   "CCC",
        name:     vizLabel("PCT_STACKED_HORIZONTAL_BAR"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            createDataReq("PCT_STACKED_HORIZONTAL_BAR", {options: false}),
            createColumnDataLabelsReq({
              separator: false,
              anchors: ["none", "center", "inside_end", "inside_base"]
            }),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 150
      },
      {
        id:       "ccc_line",
        type:     "linechart",
        source:   "CCC",
        name:     vizLabel("LINE"),
        instanceModule: instanceModule,
        args: {
            // Default value for "shape" data request
            shape: "circle"
        },
        propMap:  [],
        dataReqs: [
          {
            name: "Default",
            drillOrder: ["rows"],
            hyperlinkOrder: ["rows","columns"],
            reqs: arrayAppendMany(
              createDataReq("LINE", {options: false}),
              createLabelsVisibleAnchorDataReq(),
              createShapeDataReq(null, {separator: true}),
              createLineWidthDataReq(),
              createTrendsDataReqs(),
              createChartOptionsDataReq(true))
          }
        ],
        menuOrdinal: 160,
        menuSeparator: true
      },
      {
        id:       "ccc_area",
        type:     "areachart",
        source:   "CCC",
        name:     vizLabel("STACKED_AREA"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          drillOrder: ["rows"],
          hyperlinkOrder: ["rows","columns"],
          reqs: arrayAppendMany(
            createDataReq("STACKED_AREA",{options: false}),
            createLabelsVisibleAnchorDataReq(true),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 180
      },
      {
        id:        "ccc_scatter",
        type:      "scatter",
        source:    "CCC",
        name:      vizLabel("SCATTER"),
        instanceModule: instanceModule,
        maxValues: [1000, 2500, 5000, 10000],
        args:      {},
        propMap:   [],
        dataReqs:  [{
          name: "Default",
          reqs:  arrayAppendMany(
            {
              id: "x",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("SCATTER_X"),
              required: true,
              allowMultiple: false
            },
            {
              id: "y",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("SCATTER_Y"),
              required: true,
              allowMultiple: false
            },
            {
              id: "rows",
              dataType: "string",
              dataStructure: "column",
              caption: dropZoneLabel("SCATTER_ROW"),
              required: true,
              allowMultiple: true
            },
            {
              id: "color",
              dataType: "number, string",
              dataStructure: "column",
              caption: dropZoneLabel("SCATTER_COL"),
              required: false,
              allowMultiple: false
            },
            {
              id: "size",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("SCATTER_Z"),
              required: false,
              allowMultiple: false
            },
            createMultiDataReq(),
            createPatternDataReq(),
            createColorSetDataReq(),
            createReverseColorsDataReq(),
            createLabelsVisibleAnchorDataReq(),
            createTrendsDataReqs(),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 190,
        menuSeparator: true
      },
      {
        id: "ccc_barline",
        type: "barchart",
        source: "CCC",
        name: vizLabel("VERTICAL_BAR_LINE"),
        instanceModule: instanceModule,
        args:  {
          // Default value for "shape" data request
          shape: "circle"
        },
        propMap: [],
        // dataReqs describes the data requirements of this visualization
        dataReqs: [{
          name: "Default",
          reqs: [
            createRowDataReq("VERTICAL_BAR_LINE_ROW"),
            createColDataReq("VERTICAL_BAR_LINE_COL"),
            propSet(
              createMeaDataReq("VERTICAL_BAR_LINE_NUMCOL"),
              "required", false),
            propSet(
              createMeaDataReq("VERTICAL_BAR_LINE_NUMLINE"),
              "id", "measuresLine",
              "required", false),

            createColumnDataLabelsReq({
              value_anchor: "VALUE_COLUMN_ANCHOR",
              separator: false,
              anchors:["none", "center", "inside_end", "inside_base", "outside_end"]
            }),
            createLabelsVisibleAnchorDataReq({
              labels_option: "lineLabelsOption",
              value_anchor: "VALUE_LINE_ANCHOR"
            }),
            createMultiDataReq(),
            createShapeDataReq(null, {separator: true}),
            createLineWidthDataReq(),
            createChartOptionsDataReq(true)
          ]
        }],
        menuOrdinal: 125
      },
      {
        id: "ccc_waterfall",
        type: "waterfallchart",
        source: "CCC",
        name: vizLabel("WATERFALL"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: createDataReq("WATERFALL")
        }]
      },
      {
        id:       "ccc_boxplot",
        type:     "boxplotchart",
        source:   "CCC",
        name:     vizLabel("BOXPLOT"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: [
            createRowDataReq("BOXPLOT_ROW"),

            propSet(
              createMeaDataReq("BOXPLOT_PCT50"),
              "allowMultiple", false,
              "required", false),

            {
              id: "percentil25",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("BOXPLOT_PCT25"),
              required: false,
              allowMultiple: false
            },
            {
              id: "percentil75",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("BOXPLOT_PCT75"),
              required: false,
              allowMultiple: false
            },
            {
              id: "percentil5",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("BOXPLOT_PCT05"),
              required: false,
              allowMultiple: false
            },
            {
              id: "percentil95",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("BOXPLOT_PCT95"),
              required: false,
              allowMultiple: false
            },
            createMultiDataReq(),
            createChartOptionsDataReq()
          ]
        }]
      },
      {
        id:       "ccc_pie",
        type:     "piechart",
        source:   "CCC",
        name:     vizLabel("MULTIPLE_PIE"),
        instanceModule: instanceModule,
        args: {
          labelsOption: "outside"
        },
        propMap:  [],
        dataReqs: [{
          name: "Default",
          drillOrder: ["rows","columns"],
          hyperlinkOrder: ["rows","columns"],
          reqs: arrayAppendMany(
            createDataReq("MULTIPLE_PIE", {multi: false, options: false}),
            createPieLabelsVisiblePositionDataReq(),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 183
      },
      {
        id:        "ccc_heatgrid",
        type:      "heatgrid",
        source:    "CCC",
        name:      vizLabel("HEATGRID"),
        "class":   "pentaho.ccc.HeatGridChart",
        instanceModule: instanceModule,
        maxValues: [500, 1000, 2000, 5000],
        args:      {
          // Default value for "shape" data request
          shape:"square"
        },
        propMap:   [],
        dataReqs:  [{
          name: "Default",
          reqs: [
            {
              id: "rows",
              dataType: "string",
              dataStructure: "row",
              caption:  dropZoneLabel("HEATGRID_ROW"),
              required: true,
              allowMultiple: true
            },
            {
              id: "columns",
              dataType: "string",
              dataStructure: "column",
              caption: dropZoneLabel("HEATGRID_COL"),
              required: false,
              allowMultiple: true
            },
            {
              id: "color",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("HEATGRID_COLOR"),
              required: false,
              allowMultiple: false
            },
            {
              id: "size",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("HEATGRID_SIZE"),
              required: false,
              allowMultiple: false
            },
            createLabelsVisibleAnchorDataReq({
              hideOptions: ["left", "right", "top", "bottom"]
            }),
            createPatternDataReq({separator: true }),
            createColorSetDataReq(),
            createReverseColorsDataReq(),
            createShapeDataReq({"square": true, "circle": true}),
            createChartOptionsDataReq(true)
          ]
        }],
        menuOrdinal: 200
      },
      {
        id: "ccc_treemap",
        type: "treemapchart",
        source: "CCC",
        name: vizLabel("TREEMAP"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: [
            propSet(
              createRowDataReq("TREEMAP_ROW"),
              "required", true),
            {
              id: "size",
              dataType: "number",
              dataStructure: "column",
              caption: dropZoneLabel("TREEMAP_SIZE"),
              required: false,
              allowMultiple: false
            },
            createMultiDataReq(),
            createChartOptionsDataReq(false)
          ]
        }]
      },
      {
        id: "ccc_bulletchart",
        type: "bulletchart",
        source: "CCC",
        name: "Bullet Chart",
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [
          {
            name: "Default",
            reqs: [
              {
                id: "rows",
                dataType: "string",
                dataStructure: "row",
                caption: "Across",
                required: true
              },
              {
                id: "columns",
                dataType: "string",
                dataStructure: "column",
                caption: "Down",
                required: true
              },
              {
                id: "measures",
                dataType: "number",
                dataStructure: "column",
                caption: "Values",
                required: true
              },
              createChartOptionsDataReq()
            ]
          }
        ]
      },
      {
        id:     "ccc_sunburst",
        type:   "treemapchart",
        source: "CCC",
        name:   vizLabel("SUNBURST"),
        instanceModule: instanceModule,
        args:     {},
        propMap:  [],
        dataReqs: [{
          name: "Default",
          reqs: arrayAppendMany(
            propSet(
              createRowDataReq("SUNBURST_ROW"),
              "required", true),

            {
                id: "size",
                dataType: "number",
                dataStructure: "column",
                caption: dropZoneLabel("SUNBURST_SIZE"),
                required: false,
                allowMultiple: false
            },
            createMultiDataReq(),
            createLabelsVisibleAnchorDataReq({
              hideOptions: ["left", "right", "top", "bottom"]
            }),
            createSortDataReqs(true),
            createEmptySlicesDataReq(),
            createChartOptionsDataReq(true))
        }],
        menuOrdinal: 185
      }
    ];
  }

  // ----------

  function label(prefix, id) {
    var cat = typeof cvCatalog !== "undefined" ? cvCatalog : null;
    return (cat && id && cvCatalog[(prefix || "") + id]) || "";
  }

  function vizLabel(id) {
    return label("VIZ_", id) || id;
  }

  function dropZoneLabel(id, defaultLabel) {
    return label("dropZoneLabels_", id) ||
           label("ropZoneLabels_", id) ||
           defaultLabel || id;
  }

  function chartPropsLabel(id, defaultLabel) {
    return label("dlgChartProps", id) || defaultLabel || id;
  }

  function createRowDataReq(rowLabel) {
    return {
      id: "rows",
      dataType: "string",
      dataStructure: "column",
      caption: dropZoneLabel(rowLabel),
      required: false,
      allowMultiple: true
    };
  }

  function createColDataReq(columnLabel) {
    return {
      id: "columns",
      dataType: "string",
      dataStructure: "column",
      caption: dropZoneLabel(columnLabel),
      required: false,
      allowMultiple: true
    };
  }

  function createMeaDataReq(measureLabel) {
    return {
      id: "measures",
      dataType: "number",
      dataStructure: "column",
      caption: dropZoneLabel(measureLabel),
      required: true,
      allowMultiple: true
    };
  }

  function createMultiDataReq() {
    return {
      id: "multi",
      dataType: "string",
      dataStructure: "column",
      caption: dropZoneLabel("MULTI_CHART"),
      required: false,
      allowMultiple: true
    };
  }

  function createShapeDataReq(valuesSet, options) {
    var values = ["circle", "cross", "diamond", "square", "triangle"];
    if(valuesSet)
      values = values.filter(function(value) { return propHasOwn(valuesSet, value); });

    values.unshift("none");

    return {
      id:       "shape",
      dataType: "string",
      values:   values,
      ui: {
        labels:    values.map(function(option) { return dropZoneLabel(option.toUpperCase()); }),
        group:     "options",
        type:      "combo",
        seperator: options ? propGet(options, "separator", false) : false,
        caption:   dropZoneLabel("BULLET_STYLE")
      }
    };
  }

  function createLineWidthDataReq() {
    return {
      id: "lineWidth",
      dataType: "string",
      values: ["1", "2", "3", "4", "5", "6", "7", "8"],
      ui: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
        group: "options",
        type:  "combo",
        caption: chartPropsLabel("LineWidth")
      }
    };
  }

  function createTrendsDataReqs(keyArgs) {
    var types = ["none", "linear"];
    return [
      {
        id: "trendType",
        dataType: "string",
        values: types,
        ui: {
          labels:  types.map(function(option) {
            return dropZoneLabel("TREND_TYPE_" + option.toUpperCase());
          }),
          group: "options",
          type:  "combo",
          caption: dropZoneLabel("TREND_TYPE"),
          seperator: propGet(keyArgs, "separator", true)
        }
      },
      {
        id: "trendName",
        dataType: "string",
        ui: {
          group: "options",
          type:  "textbox",
          caption: dropZoneLabel("TREND_NAME")
        }
      },
      {
        id: "trendLineWidth",
        dataType: "string",
        values: ["1", "2", "3", "4", "5", "6", "7", "8"],
        ui: {
          labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
          group: "options",
          type:  "combo",
          caption: dropZoneLabel("TREND_LINEWIDTH")
        }
      }
    ];
  }

  function createSortDataReqs(addSeparator) {
    var types = ["bySizeDescending", "bySizeAscending", "none"];
    return {
      id: "sliceOrder",
      dataType: "string",
      values: types,
      ui: {
        labels: types.map(function(option) {
          return dropZoneLabel("SORT_TYPE_" + option.toUpperCase());
        }),
        group:     "options",
        type:      "combo",
        caption:   dropZoneLabel("SORT_TYPE"),
        seperator: addSeparator
      }
    };
  }

  function createPatternDataReq(keyArgs) {
    return {
      id: "pattern",
      dataType: "string",
      values: ["GRADIENT", "3-COLOR", "5-COLOR"],
      ui: {
        labels: ["GRADIENT", "3_STEP", "5_STEP"].
                map(function(option) { return dropZoneLabel(option); }),
        group: "options",
        type:  "combo",
        caption: dropZoneLabel("PATTERN"),
        seperator: propGet(keyArgs, "separator", false)
      }
    };
  }

  function createColorSetDataReq() {
    return {
      id: "colorSet",
      dataType: "string",
      values: ["ryg", "ryb", "blue", "gray"],
      ui: {
        labels:  ["RYG", "RYB", "BLUE", "GRAY"].
                 map(function(option) { return dropZoneLabel("GRAD_" + option); }),
        group:   "options",
        type:    "combo",
        caption: dropZoneLabel("COLORSET")
      }
    };
  }

  function createReverseColorsDataReq() {
    return {
      id: "reverseColors",
      dataType: "boolean",
      ui: {
        label: dropZoneLabel("COLORSET_REVERSE"),
        group: "options",
        type:  "checkbox"
      }
    };
  }

  function createEmptySlicesDataReq() {
    return {
      id: "emptySlicesHidden",
      dataType: "boolean",
      value: true,
      ui: {
        label:   dropZoneLabel("SHOW_AS_GAPS"),
        group:   "options",
        type:    "checkbox",
        caption: dropZoneLabel("EMPTY_SLICES")
      }
    };
  }

  function createPieLabelsVisiblePositionDataReq(keyArgs) {
    var positions = ["none", "outside", "inside"];

    return {
      id: "labelsOption",
      dataType: "string",
      values: positions,
      // value: "outside",
      ui: {
        labels: positions.map(function(option) {
          return dropZoneLabel("VALUE_POSITION_" + option.toUpperCase());
        }),
        group: "options",
        type:  "combo",
        caption: dropZoneLabel("VALUE_POSITION")
      }
    };
  }

  function createLabelsVisibleAnchorDataReq(keyArgs) {
    var anchors = ["none", "center", "left", "right", "top", "bottom"],
        hideOptions = propGet(keyArgs, "hideOptions");

    if(hideOptions) {
      for(var i = 0; i < hideOptions.length; i++) {
        for(var j = 0; j < anchors.length; j++) {
          if(anchors[j] === hideOptions[i]) {
            anchors.splice(j, 1);
            break;
          }
        }
      }
    }

    return {
      id: propGet(keyArgs, "labels_option", "labelsOption"),
      dataType: "string",
      values: anchors,
      ui: {
        labels: anchors.map(function(option) {
          return dropZoneLabel("VALUE_ANCHOR_DOTS_" + option.toUpperCase());
        }),
        group: "options",
        type:  "combo",
        caption: dropZoneLabel(propGet(keyArgs, "value_anchor", "VALUE_ANCHOR"))
      }
    };
  }

  function createColumnDataLabelsReq(keyArgs) {
    var anchors = propGet(keyArgs, "anchors");

    return {
      id: "labelsOption",
      dataType: "string",
      values: anchors,
      ui: {
        labels: anchors.map(function(option) {
          return dropZoneLabel("COLUMN_LABEL_ANCHOR_" + option.toUpperCase());
        }),
        group: "options",
        type:  "combo",
        seperator: propGet(keyArgs, "separator", true),
        caption: dropZoneLabel(propGet(keyArgs, "value_anchor", "VALUE_ANCHOR"))
      }
    };
  }

  function createChartOptionsDataReq(hasSeparator) {
    return {
      id: "optionsBtn",
      dataType: "none",
      ui: {
        group:     "options",
        type:      "button",
        label:     dropZoneLabel("CHART_OPTIONS"),
        seperator: hasSeparator || false
      }
    };
  }

  function createDataReq(chartId, options) {
    var json = [];

    if(propGet(options, "row", true))
        json.push(createRowDataReq(chartId + "_ROW"));

    if(propGet(options, "column", true))
        json.push(createColDataReq(chartId + "_COL"));

    if(propGet(options, "measure", true))
        json.push(createMeaDataReq(chartId + "_NUM"));

    if(propGet(options, "multi", true))
        json.push(createMultiDataReq());

    if(propGet(options, "options", true))
        json.push(createChartOptionsDataReq(false));

    return json;
  }

  // -----

  function propGet(o, p, dv) {
    var v;
    return o && (v = o[p]) != null ? v : dv;
  }

  function propSet(o) {
      // Not assigning to arguments variable allows optimizations.
    var oo = o || {},
        a  = arguments;
    for(var i = 1, A = a.length - 1 ; i < A ; i += 2) oo[a[i]] = a[i+1];
    return oo;
  }

  function propHasOwn(o, p) {
    return !!o && O_hasOwn.call(o, p);
  }

  function arrayAppendMany(target) {
      var a = arguments, S = a.length, source;
      target = arrayTo(target);
      if(S > 1) {
          for(var s = 1 ; s < S ; s++) {
              if((source = arrayTo(a[s]))) {
                  var i = 0, L = source.length;
                  while(i < L) target.push(source[i++]);
              }
          }
      }
      return target;
  }

  function arrayTo(v) {
      return (v instanceof Array) ? v : ((v != null) ? [v] : null);
  }
});
