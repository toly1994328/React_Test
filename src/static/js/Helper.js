export default class Helper {


    nodeCreater(name, value, symbolSize, category, draggable = true) {
        let node = {};
        node.name = name;
        node.value = value;
        node.symbolSize = symbolSize;
        node.category = category;
        node.draggable = draggable;
        return node;
    }

     link(nodef, ...nodes) {
        let links = [];
        nodes.forEach(node => {
            let link = {};
            link.source = nodef.name;
            link.target = node.name;
            link.category = node.category;
            links.push(link)
        });
        return links;
    }

     categories(data) {
        let set = new Set();
        data.forEach(item => {
            set.add(item.category);
        });

        let cgs = [];
        set.forEach(name => {

            let cg = {};
            cg.name = name;
            cgs.push(cg)
        });

        return cgs;
    }
};