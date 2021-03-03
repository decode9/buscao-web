const _valueSelection = (node: any, select: string) => {
    switch (select) {
        case 'country':
            return node['commerce']['country']['slug']
        case 'categories':
            return node['categories']['nodes']
        case 'state':
            return node['commerce']['subsidiary']
        case 'title':
            return node['title']
        case 'subsidiary':
            return node
        case 'outstanding':
            return node['commerce']['outstanding']
        default:
            return node[select]
    }
}

export const Filter = (nodes: Array<any>, filter, selection: string) => {

    const nodeFilter = (node) => {
        let validation = true;
        let validFilter = false;
        let select = _valueSelection(node, selection);
        if (Array.isArray(select)) {
            validFilter = select.some((data) => {
                if (data[selection]) return data[selection]['slug'].toLowerCase().includes(filter.toLowerCase())
                if (data['slug']) return data['slug'].toLowerCase().includes(filter.toLowerCase())
            })
            return validation && validFilter
        }
        if (typeof select == 'string') validFilter = (select.toLowerCase().includes(filter.toLowerCase()))
        if (typeof select == 'boolean') validFilter = select == filter;
        if (selection == 'subsidiary') validFilter = select['state']['slug'].toLowerCase().includes(filter.toLowerCase())
        return validation && validFilter
    }

    return (filter) ? nodes.filter(nodeFilter) : nodes;
}