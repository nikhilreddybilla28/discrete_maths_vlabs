import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

var relation = {
    nodes: [1, 2, 3, 4, 5,6,7,8,9,10],
    edges: [
        [1,3],
        [1,4],
        [1,6],
        [2,4],
        [2,5],
        [2,7],
        [3,5],
        [3,8],
        [4,9],
        [5,10],
        [6,7],
        [7,8],
        [8,9],
        [9,10],
        [10,1]
    ]
};

var node_color = [0,0,0,0,0,0,0,0,0,0]

var color_id = ["yellow", "red", "green", "blue"]

// Create cytoscape nodes
var cy_nodes = relation.nodes.map((x) => {
    return { data: { id: `${x}` } };
});

var cy_edges = relation.edges.map((x) => {
    return {
        data: { id: `${x[0]}-${x[1]}`, source: `${x[0]}`, target: `${x[1]}` }
    };
});

var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),

    boxSelectionEnabled: false,
    autounselectify: true,
    userZoomingEnabled: false,
    zoomingEnabled: false,

    layout: {
        name: "dagre"
    },

    style: [
    {
        selector: "node",
        style: {
            // content: "data(id)",
            "text-opacity": 0.5,
            "text-valign": "center",
            "text-halign": "center",
            // "text-background-color" : "white",
            "background-color": "yellow"
        }
    },

    {
        selector: "node.yellow",
        style: {
            "background-color": "yellow"
        }
    },
    {
        selector: "node.red",
        style: {
            "background-color": "red"
        }
    },
    {
        selector: "node.green",
        style: {
            "background-color": "green"
        }
    },

    {
        selector: "node.blue",
        style: {
            "background-color": "blue"
        }
    },
    {
        selector: "edge",
        style: {
            "curve-style": "bezier",
            width: 4,
            // "target-arrow-shape": "triangle",
            "line-color": "#9dbaea",
            // "target-arrow-color": "#9dbaea"
        }
    },
    {
        selector: "edge.red",
        style: {
            "line-color": "red",
            "target-arrow-color": "red"
        }
    },
    {
        selector: "edge.green",
        style: {
            "line-color": "green",
            "target-arrow-color": "green"
        }
    }
    ],

    elements: {
        nodes: cy_nodes,
        edges: cy_edges
    }
}));


cy.on("click", "node", function (evt) {
    console.log("clicked " + this.id());

    console.log(color_id[(node_color[Number(this.id())]+1)%4])
    this.toggleClass(color_id[node_color[Number(this.id())]]);
    this.toggleClass(color_id[(node_color[Number(this.id())]+1)%4]);
    node_color[Number(this.id())] = (node_color[Number(this.id())] + 1) % 4;
    for (e of this.connectedEdges()) {
        y = e.target().id();
        if (y == this.id()) {
            y = e.source().id();
        } 
        if (node_color[Number(y)] == node_color[Number(this.id())]) {
            e.removeClass("green");
            e.addClass("red");
        } else {
            e.removeClass("red");
            e.addClass("green");
        }
        console.log(y);
    }
    // console.log(e);
    // if (hasse_edges.includes(this.id())) {
    //     this.addClass("green");
    // } else {
    // this.addClass("red");
    // }
    // console.log(this.source().id());
    // console.log(evt);
});

