function componentData() {
    return {
        init() {
        },
        orderData: {
            customerName: '',
            designs: [],
            requiresMockup: false,
            effortScore: 0,
            quote: 0
        },
        update() {
            this.calcEffort();
            this.calcQuote();
        },
        calcEffort() {
            // Base effort for all orders
            var effort = 10;
            
            // Designs
            // Base for each design
            effort += 5 * this.orderData.designs.length;
            // Colours x complexity x num cookies
            this.orderData.designs.forEach(design => {
                effort += (((3 * design.numColours) + (5 * design.complexity)) * design.numCookies);
            });
            
            this.orderData.effortScore = effort;
        },
        calcQuote() {
            this.orderData.quote = 6
        },
        addDesign() {
            this.orderData.designs.push({
                name: '',
                numCookies: '',
                shape: -1,
                numColours: 1,
                complexity: -1,
                addOns: []
            });
            this.update();
        },
        addOrder() {
            addRow('orders', { name: this.orderData.customerName }).then(response => {
                console.log(response)
            });
            console.log('hello from neworderjs')
        },
        shapes: [{
            id: 0,
            name: 'circle'
        },{
            id: 1,
            name: 'square'
        }],
        designComplexity: [{
            id: 0,
            name: 'basic shape'
        },{
            id: 1,
            name: 'shape with some details on top'
        },{
            id: 2,
            name: 'shape with intricate/advanced detailing'
        }]
    };
}
